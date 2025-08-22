const fetch = require("node-fetch");

async function fetchJoke() {
  try {
    const res = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const data = await res.json();
    return `${data.setup} — ${data.punchline}`;
  } catch (err) {
    return "😅 Couldn't fetch a joke right now!";
  }
}

module.exports = { fetchJoke }; 
