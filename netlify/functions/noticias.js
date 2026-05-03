const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

exports.handler = async function () {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'NEWS_API_KEY no configurada' }),
    };
  }

  const url =
    'https://newsapi.org/v2/everything' +
    '?q=bioetanol+OR+bioethanol' +
    '&language=es' +
    '&pageSize=3' +
    '&sortBy=publishedAt' +
    '&apiKey=' + apiKey;

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
