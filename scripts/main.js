export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate("../partials/header.html");
    const footerTemplate = await loadTemplate("../partials/footer.html");

    const headerElement = document.querySelector("#dy-header");
    const footerElement = document.querySelector("#dy-footer");

    if (headerElement) {
      renderWithTemplate(headerTemplate, headerElement);
    } else {
      console.warn("Header element '#dy-header' not found");
    }

    if (footerElement) {
      renderWithTemplate(footerTemplate, footerElement);
    } else {
      console.warn("Footer element '#dy-footer' not found");
    }
  } catch (error) {
    console.error("Error loading header/footer:", error);
  }
}
