export default async function handler(request) {
  try {
    // Log the request headers to verify the incoming data
    console.log(request.headers);

    // Try to extract the IP from the 'x-forwarded-for' header
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';

    const sheetApiUrl = 'https://api.sheetbest.com/sheets/ba57befc-c8ec-468b-97b0-9f0def16168d';
    const data = { ip };

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
    // Log error details for debugging
    console.error('Error sending IP to Sheets:', error);

    return new Response(JSON.stringify({
      message: 'Failed to send IP to Google Sheets',
      error: error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

