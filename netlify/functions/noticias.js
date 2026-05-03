const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

exports.handler = async function () {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'GNEWS_API_KEY no configurada' }),
    };
  }

  const url =
    'https://gnews.io/api/v4/search' +
    '?q=bioetanol+OR+bioethanol' +
    '&lang=es' +
    '&max=3' +
    '&apikey=' + apiKey;

  try {
    const response = await fetch(url);
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
