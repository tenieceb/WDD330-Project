// ----------------------
// Wikipedia Info Loader
// ----------------------
async function loadWikipediaInfo(name) {
  const habitatDietEl = document.getElementById("habitat-diet");
  const lifespanEl = document.getElementById("lifespan-facts");

  try {
    // Fetch Wikipedia summary
    const wikiApiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`;
    const res = await fetch(wikiApiUrl);

    if (!res.ok) {
      habitatDietEl.textContent = "Wikipedia info not found.";
      lifespanEl.textContent = "";
      return;
    }

    const data = await res.json();

    if (data.extract) {
      habitatDietEl.textContent = data.extract;
      lifespanEl.textContent = "";
    } else {
      habitatDietEl.textContent = "No summary available from Wikipedia.";
      lifespanEl.textContent = "";
    }
  } catch (err) {
    habitatDietEl.textContent = "Error loading Wikipedia info.";
    lifespanEl.textContent = "";
    console.error("Wikipedia fetch error:", err);
  }
}

