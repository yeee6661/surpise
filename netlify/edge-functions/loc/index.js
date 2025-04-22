export default async function handler(request) {
  try {
    // Log the request headers to verify the incoming data
    console.log(request.headers);

    // Try to extract the IP from the 'x-forwarded-for' header
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';

    // Check if the IP is in IPv6 format and log it
    if (ip.includes(':')) {
      console.log('Captured IPv6 address:', ip);
    } else {
      console.log('Captured IPv4 address:', ip);
    }

    // Prepare the data object with the correct field name that matches your Google Sheet column
    const data = { 'IP Address': ip };

    // Log the data being sent to Sheet.best for debugging
    console.log('Sending data:', data);

    const sheetApiUrl = 'https://api.sheetbest.com/sheets/ba57befc-c8ec-468b-97b0-9f0def16168d';
    
    // Send data to the Google Sheets via Sheet.best API
    const response = await fetch(sheetApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Get the result from the API response
    const result = await response.json();

    // Log the response from Sheet.best API
    console.log('API Response:', result);

    // Return a success message along with the API result
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

    // Return an error response
    return new Response(JSON.stringify({
      message: 'Failed to send IP to Google Sheets',
      error: error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
