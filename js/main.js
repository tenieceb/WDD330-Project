import { fetchSpecies } from './species.js';
import { loadHeaderFooter } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  fetchSpecies();
});
loadHeaderFooter();