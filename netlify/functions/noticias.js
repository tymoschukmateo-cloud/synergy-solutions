const SUCCESS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
  'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
};

const ERROR_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
};

exports.handler = async function () {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: ERROR_HEADERS,
      body: JSON.stringify({ error: 'GNEWS_API_KEY no configurada' }),
    };
  }

  const url =
    'https://gnews.io/api/v4/search' +
    '?q=bioetanol+OR+bioethanol' +
    '&lang=es' +
    '&max=3' +
    '&apikey=' + apiKey;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    const data = await response.json();
    return {
      statusCode: 200,
      headers: SUCCESS_HEADERS,
      body: JSON.stringify(data),
    };
  } catch (err) {
    clearTimeout(timeout);
    return {
      statusCode: 502,
      headers: ERROR_HEADERS,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
