const DEFAULT_FOLDER_ID = '1VCnTDzoYmmCQ5nMUaIggYnOIyPfJ2h1R';
const DEFAULT_FILENAME = 'Fozayel-Ibn-Ayaz-CV.pdf';
const PDF_MIME = 'application/pdf';

function getConfig() {
  return {
    folderId: process.env.GOOGLE_DRIVE_FOLDER_ID || process.env.DRIVE_FOLDER_ID || DEFAULT_FOLDER_ID,
    apiKey: process.env.GOOGLE_DRIVE_API_KEY || process.env.DRIVE_API_KEY || ''
  };
}

function sanitizeFilename(name = DEFAULT_FILENAME) {
  const clean = String(name).replace(/[\\/\r\n\t\0]/g, '-').replace(/[^\w.()\-\s]/g, '').trim();
  return clean.toLowerCase().endsWith('.pdf') ? clean : DEFAULT_FILENAME;
}

async function requestJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Google Drive metadata request failed: ${response.status} ${text}`);
  }
  return response.json();
}

function decodeDriveEscapedJson(value) {
  return value
    .replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\\//g, '/')
    .replace(/\\=/g, '=');
}

async function findLatestPdfViaApi(folderId, apiKey) {
  const query = `'${folderId}' in parents and mimeType='${PDF_MIME}' and trashed=false`;
  const params = new URLSearchParams({
    q: query,
    orderBy: 'modifiedTime desc',
    pageSize: '1',
    fields: 'files(id,name,mimeType,modifiedTime,size)',
    supportsAllDrives: 'true',
    includeItemsFromAllDrives: 'true',
    key: apiKey
  });

  const data = await requestJson(`https://www.googleapis.com/drive/v3/files?${params.toString()}`);
  const file = data.files && data.files[0];
  if (!file) throw new Error(`No PDF was found in Google Drive folder ${folderId}.`);
  return { ...file, source: 'drive-api' };
}

async function findLatestPdfViaPublicFolder(folderId) {
  const url = `https://drive.google.com/drive/folders/${encodeURIComponent(folderId)}?usp=sharing`;
  const response = await fetch(url, {
    headers: {
      Accept: 'text/html,application/xhtml+xml',
      'User-Agent': 'Mozilla/5.0 portfolio-cv-backend'
    }
  });

  if (!response.ok) {
    throw new Error(`Google Drive public folder request failed: ${response.status}`);
  }

  const html = await response.text();
  const ivdMatch = html.match(/window\['_DRIVE_ivd'\]\s*=\s*'([^']+)'/);
  const files = [];

  if (ivdMatch) {
    try {
      const decoded = decodeDriveEscapedJson(ivdMatch[1]);
      const data = JSON.parse(decoded);
      const rows = Array.isArray(data?.[0]) ? data[0] : [];
      rows.forEach((row) => {
        if (!Array.isArray(row)) return;
        const [id, parents, name, mimeType] = row;
        if (!id || !name || mimeType !== PDF_MIME) return;
        const modifiedMs = Number(row[10] || row[9] || 0);
        const size = row[13] ? String(row[13]) : undefined;
        files.push({
          id,
          name,
          mimeType,
          size,
          modifiedTime: modifiedMs ? new Date(modifiedMs).toISOString() : undefined,
          modifiedMs,
          parents,
          source: 'public-folder'
        });
      });
    } catch (error) {
      // Fall through to HTML data-id parsing below.
    }
  }

  if (!files.length) {
    const cardPattern = /data-id="([\w-]{20,})"[^>]*data-tooltip="([^"]+\.pdf) PDF"/gi;
    let match;
    while ((match = cardPattern.exec(html))) {
      files.push({
        id: match[1],
        name: match[2],
        mimeType: PDF_MIME,
        source: 'public-folder-card',
        modifiedMs: 0
      });
    }
  }

  const unique = Array.from(new Map(files.map((file) => [file.id, file])).values());
  unique.sort((a, b) => Number(b.modifiedMs || 0) - Number(a.modifiedMs || 0));
  const file = unique[0];
  if (!file) {
    throw new Error(`No public PDF was found in Google Drive folder ${folderId}. Make sure the folder is shared with “Anyone with the link can view”.`);
  }
  return file;
}

async function findLatestPdf() {
  const { folderId, apiKey } = getConfig();
  if (apiKey) {
    try {
      return await findLatestPdfViaApi(folderId, apiKey);
    } catch (error) {
      // If the API key is restricted incorrectly, still try the public folder fallback.
      return findLatestPdfViaPublicFolder(folderId);
    }
  }
  return findLatestPdfViaPublicFolder(folderId);
}

async function downloadWithApi(file, apiKey) {
  const params = new URLSearchParams({ alt: 'media', key: apiKey, supportsAllDrives: 'true' });
  return fetch(`https://www.googleapis.com/drive/v3/files/${file.id}?${params.toString()}`);
}

async function downloadWithPublicUrl(file) {
  return fetch(`https://drive.google.com/uc?export=download&id=${encodeURIComponent(file.id)}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 portfolio-cv-backend' },
    redirect: 'follow'
  });
}

async function getDriveCvBuffer() {
  const { apiKey } = getConfig();
  const file = await findLatestPdf();
  let response = apiKey ? await downloadWithApi(file, apiKey) : await downloadWithPublicUrl(file);

  if (!response.ok && apiKey) {
    response = await downloadWithPublicUrl(file);
  }

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Google Drive CV download failed: ${response.status} ${text.slice(0, 220)}`);
  }

  const contentType = response.headers.get('content-type') || '';
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (!contentType.includes('pdf') && !buffer.subarray(0, 4).equals(Buffer.from('%PDF'))) {
    throw new Error('Google Drive returned a non-PDF response. Check that the Drive file is shared publicly.');
  }

  const filename = sanitizeFilename(file.name);
  return {
    file,
    filename,
    buffer,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'private, no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex'
    }
  };
}

async function getDriveCvMetadataHeaders() {
  const file = await findLatestPdf();
  const filename = sanitizeFilename(file.name);
  return {
    file,
    filename,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'private, no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex',
      ...(file.size ? { 'Content-Length': String(file.size) } : {})
    }
  };
}

function errorPayload(error) {
  return {
    error: 'CV backend is not available',
    message: error.message,
    adminNote: 'Make the Google Drive folder public. Optional: add GOOGLE_DRIVE_API_KEY in Vercel/Netlify for a stronger Drive API connection.'
  };
}

module.exports = {
  DEFAULT_FOLDER_ID,
  DEFAULT_FILENAME,
  findLatestPdf,
  getDriveCvBuffer,
  getDriveCvMetadataHeaders,
  errorPayload
};
