const change = document.querySelector(".here");
const user = sessionStorage.getItem("userName");

if (user) {
  change.innerHTML = `SYBAU <b>${user}</b> why u built like an unpaid therapy session, ur aura smell like unwashed regret. whole energy got main character syndrome but u an npc in everyone else’s story.`;
}