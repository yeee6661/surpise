// netlify/edge-functions/loc/index.js

export default async function handler(request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  const sheetApiUrl = 'https://api.sheetbest.com/sheets/ba57befc-c8ec-468b-97b0-9f0def16168d';

  const data = { ip };

  try {
    const response = await fetch(sheetApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return new Response(JSON.stringify({
      message: 'IP captured and sent to Google Sheets!',
      result,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      message: 'Failed to send IP to Google Sheets',
      error: error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
