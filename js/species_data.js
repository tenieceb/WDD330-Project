const GBIF_TAXON_URL = "https://api.gbif.org/v1/species";
const GBIF_IUCN_URL = (id) => `https://api.gbif.org/v1/species/${id}/iucnRedListCategory`;
const GBIF_OCCURRENCE_URL = (id) => `https://api.gbif.org/v1/occurrence/search?taxonKey=${id}&limit=100`;

/**
 * Fetch Wikipedia summary for species by common name
 * @param {string} speciesName
 * @returns {Promise<{extract: string, pageId: number} | null>}
 */
export async function fetchWikiSummary(speciesName) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(speciesName)}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Wikipedia summary fetch failed with status ${res.status} for ${speciesName}`);
      return null;
    }
    const data = await res.json();
    return { extract: data.extract || "", pageId: data.pageid || null };
  } catch (err) {
    console.error("Wikipedia summary fetch error:", err);
    return null;
  }
}

/**
 * Fetch Wikipedia image URL for species page id
 * @param {number} pageId
 * @returns {Promise<string|null>} image URL or null
 */
export async function fetchWikiImage(pageId) {
  if (!pageId) return null;
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=pageimages&pageids=${pageId}&format=json&pithumbsize=500`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const page = data.query.pages[pageId];
    return page?.thumbnail?.source || null;
  } catch (err) {
    console.error("Wikipedia image fetch error:", err);
    return null;
  }
}

/**
 * Fetch GBIF species match (taxon ID) by species common name or scientific name
 * @param {string} name
 * @returns {Promise<number|null>} - GBIF usageKey or null
 */
export async function matchGBIFSpeciesName(name) {
  try {
    const res = await fetch(`${GBIF_TAXON_URL}/match?name=${encodeURIComponent(name)}`);
    if (!res.ok) {
      console.warn(`GBIF match API returned status ${res.status} for ${name}`);
      return null;
    }
    const data = await res.json();
    return data.usageKey || null;
  } catch (err) {
    console.error("GBIF match error:", err);
    return null;
  }
}

/**
 * Fetch IUCN conservation status from GBIF
 * @param {number} gbifID
 * @returns {Promise<object|null>}
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

/**
 * Fetch occurrence data from GBIF for mapping
 * @param {number} gbifID
 * @returns {Promise<object|null>}
 */
export async function getGBIFOccurrenceMapData(gbifID) {
  try {
    const res = await fetch(GBIF_OCCURRENCE_URL(gbifID));
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("GBIF occurrence fetch error:", err);
    return null;
  }
}
