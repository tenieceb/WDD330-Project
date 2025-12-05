export function renderSpeciesDetails(species, status) {
  const container = document.querySelector("#species-details");

  container.innerHTML = `
    <h2>${species.name}</h2>

    <p><strong>Scientific Name:</strong> 
      ${species.taxonomy?.scientific_name ?? "N/A"}
    </p>

    <p><strong>Habitat:</strong> 
      ${species.characteristics?.habitat ?? "Unknown"}
    </p>

    <p><strong>Diet:</strong> 
      ${species.characteristics?.diet ?? "Unknown"}
    </p>

    <p><strong>Lifespan:</strong> 
      ${species.characteristics?.lifespan ?? "Unknown"}
    </p>

    <p><strong>Conservation Status:</strong> 
      ${status?.iucnRedListCategory ?? "Not Evaluated"}
    </p>
  `;
}
