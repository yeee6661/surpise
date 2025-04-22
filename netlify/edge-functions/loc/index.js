export default async function handler(request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';

    // Get browser-provided location from POST body (if any)
    const body = await request.json().catch(() => ({}));
    const { latitude, longitude } = body;

    // Fallback geolocation from IP
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoResponse.json();

    const city = geoData.city || 'unknown';
    const region = geoData.region || 'unknown';
    const country = geoData.country_name || 'unknown';

    const sheetApiUrl = 'https://api.sheetbest.com/sheets/ba57befc-c8ec-468b-97b0-9f0def16168d';

    const data = {
      ip,
      city,
      region,
      country,
      latitude: latitude || 'not provided',
      longitude: longitude || 'not provided',
    };

    const response = await fetch(sheetApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return new Response(JSON.stringify({
      message: 'IP and location data sent to Google Sheets!',
      result,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error sending location to Sheets:', error);
    return new Response(JSON.stringify({
      message: 'Failed to send data',
      error: error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
