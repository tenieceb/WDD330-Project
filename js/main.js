// main.js

import { getSpeciesData, matchGBIFScientificName, getGBIFConservationStatus } from "./species_data.js";

import { renderSpeciesDetails } from "./species_details.js";

import { loadHeaderFooter, qs, renderWithTemplate } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const search = qs("input[type='search']");

  search.addEventListener("change", async () => {
    const name = search.value.trim();
    if (!name) return;

    // 1. Fetch basic species info
    const animals = await getSpeciesData(name);
    if (!animals.length) return alert("No species found.");

    const species = animals[0];

    // 2. Match scientific name to GBIF
    const sciName = species.taxonomy?.scientific_name;
    const gbifID = sciName ? await matchGBIFScientificName(sciName) : null;

    // 3. Fetch conservation status
    const status = gbifID ? await getGBIFConservationStatus(gbifID) : null;

    // 4. Render the page
    renderSpeciesDetails(species, status);
  });
});

loadHeaderFooter();