const GNEWS_URL =
  'https://gnews.io/api/v4/search?q=biocombustibles+etanol&lang=es&max=3&apikey=e3859fccb3cbc8854163a4162d89a0de';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

exports.handler = async function () {
  try {
    const response = await fetch(GNEWS_URL);
    if (!response.ok) {
      throw new Error('GNews responded with status ' + response.status);
    }
    const data = await response.json();
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
