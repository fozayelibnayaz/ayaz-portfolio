const { getDriveCvBuffer, getDriveCvMetadataHeaders, errorPayload } = require('./_drive-cv');

module.exports = async function handler(req, res) {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    if (req.method === 'HEAD') {
      const cv = await getDriveCvMetadataHeaders();
      Object.entries(cv.headers).forEach(([key, value]) => res.setHeader(key, value));
      res.status(200).end();
      return;
    }

    const cv = await getDriveCvBuffer();
    Object.entries(cv.headers).forEach(([key, value]) => res.setHeader(key, value));
    res.status(200).send(cv.buffer);
  } catch (error) {
    res.status(503).json(errorPayload(error));
  }
};
