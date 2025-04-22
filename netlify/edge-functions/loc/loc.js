// netlify/functions/log-ip.js

export default async (request, context) => {
  // Capture the user's IP address from the request headers
  const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

  // Log the IP to confirm it's being captured
  console.log('Captured IP: ', ip);

  // Define the URL for the sheet.best API
  const sheetApiUrl = 'https://api.sheetbest.com/sheets/ba57befc-c8ec-468b-97b0-9f0def16168d';

  // Prepare the data to send to Google Sheets
  const data = {
    ip: ip // This assumes you have a column named "ip" in your Google Sheets
  };

  // Make a POST request to send the data to sheet.best
  try {
    const response = await fetch(sheetApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log('Data added to sheet: ', result);

    // Return a response to the user (can be an HTML page or JSON)
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'IP captured and added to Google Sheets successfully!',
        result,
      }),
    };
  } catch (error) {
    console.error('Error while sending IP to Google Sheets: ', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'An error occurred while capturing IP.',
        error: error.message,
      }),
    };
  }
};
