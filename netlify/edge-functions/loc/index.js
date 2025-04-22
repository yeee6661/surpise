export default async function handler(request) {
  try {
    // Get the incoming JSON data (latitude and longitude) from the request body
    const { latitude, longitude } = await request.json();

    // Log the captured coordinates for debugging
    console.log('Captured Latitude:', latitude);
    console.log('Captured Longitude:', longitude);

    // URL of your Sheet.best API (replace this with your actual Sheet.best URL)
    const sheetApiUrl = 'https://api.sheetbest.com/sheets/ba57befc-c8ec-468b-97b0-9f0def16168d';

    // Prepare the data object to be sent to Google Sheets
    const data = {
      Latitude: latitude,
      Longitude: longitude,
    };

    // Log the data being sent to Sheets for debugging
    console.log('Sending data to Sheets:', data);

    // Send the data to Google Sheets via the Sheet.best API
    const response = await fetch(sheetApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Get the result from Sheet.best API
    const result = await response.json();

    // Return a success response with the result from the Sheet.best API
    return new Response(JSON.stringify({
      message: 'Location captured and sent to Google Sheets!',
      result,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    // Log error details for debugging
    console.error('Error sending location to Sheets:', error);

    // Return an error response
    return new Response(JSON.stringify({
      message: 'Failed to send location to Google Sheets',
      error: error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

