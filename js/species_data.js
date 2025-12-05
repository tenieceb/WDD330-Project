// species_data.js

const NINJA_KEY = "V2BVr+n6Z4LYeOAUq3g0Kw==p7nCK3PSKpMxvwQs";
const NINJA_URL = "https://api.api-ninjas.com/v1/animals";
const GBIF_TAXON_URL = "https://api.gbif.org/v1/species";
const GBIF_IUCN_URL = (id) => `https://api.gbif.org/v1/species/${id}/iucnRedListCategory`;

/**
 * Fetch species basic data from API Ninjas
 */
export async function getSpeciesData(name) {
  try {
    const res = await fetch(`${NINJA_URL}?name=${name}`, {
      headers: { "X-Api-Key": NINJA_KEY }
    });

    if (!res.ok) throw new Error("Ninjas fetch failed");
    return await res.json();
  } catch (err) {
    console.error("Ninjas API error:", err);
    return [];
  }
}


//  * Fetch GBIF species match (taxon ID)
export async function matchGBIFScientificName(scientificName) {
  try {
    const res = await fetch(`${GBIF_TAXON_URL}/match?name=${scientificName}`);
    const data = await res.json();
    return data.usageKey || null;
  } catch (err) {
    console.error("GBIF match error:", err);
    return null;
  }
}

/**
 * Fetch IUCN conservation status from GBIF
 */
export async function getGBIFConservationStatus(gbifID) {
  try {
    const res = await fetch(GBIF_IUCN_URL(gbifID));
    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error("GBIF IUCN fetch error:", err);
    return null;
  }
}
