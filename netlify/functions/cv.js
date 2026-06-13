const { getDriveCvBuffer, getDriveCvMetadataHeaders, errorPayload } = require('../../api/_drive-cv');

exports.handler = async (event) => {
  if (!['GET', 'HEAD'].includes(event.httpMethod)) {
    return {
      statusCode: 405,
      headers: { Allow: 'GET, HEAD', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    if (event.httpMethod === 'HEAD') {
      const cv = await getDriveCvMetadataHeaders();
      return { statusCode: 200, headers: cv.headers, body: '' };
    }

    const cv = await getDriveCvBuffer();
    return {
      statusCode: 200,
      headers: cv.headers,
      body: cv.buffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify(errorPayload(error))
    };
  }
};
