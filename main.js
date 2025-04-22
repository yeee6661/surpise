const text = document.querySelector("#main");
const btn = document.querySelector(".btn");
const change = document.querySelector(".here")
btn.addEventListener("click", function () {
    const name = text.value;
    sessionStorage.setItem("userName", name);
    window.location.href = "output.html";
})

// This function will be triggered when the page is loaded
window.addEventListener('load', async () => {
  try {
    // Make a request to the Edge Function hosted on your Netlify site
    const response = await fetch('https://surprise-yourself.netlify.app/.netlify/edge-functions/loc/loc.js', {
      method: 'GET', // or POST depending on your Edge Function setup
    });

    // Check if the request was successful
    if (response.ok) {
      const data = await response.json();
      console.log('IP sent to Google Sheets:', data);
    } else {
      console.error('Error sending IP to Google Sheets');
    }
  } catch (error) {
    console.error('Error fetching the Edge Function:', error);
  }
});
