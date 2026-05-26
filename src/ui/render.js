import { createElement } from './dom.js';

function createEraCard(era) {
  const card = createElement('div', 'era reveal');
  const imageWrap = createElement('div', 'era-img');
  const image = createElement('img');
  const info = createElement('div', 'era-info');

  image.src = era.image;
  image.alt = era.alt;
  imageWrap.append(image);

  info.append(
    createElement('div', 'era-yr', era.year),
    createElement('div', 'era-nm', era.name),
    createElement('div', 'era-bd', era.body)
  );
  card.append(imageWrap, info);

  return card;
}

function createProductCard(product, onSelect) {
  const card = createElement('div', 'product-card');
  const image = createElement('img', 'product-image');
  const overlay = createElement('div', 'product-overlay');
  const button = createElement('button', 'product-btn', 'View Details');

  image.src = product.image;
  image.alt = product.alt || product.name;
  button.type = 'button';

  overlay.append(
    createElement('div', 'product-era', product.era),
    createElement('div', 'product-name', product.name),
    button
  );
  card.append(image, overlay);
  card.addEventListener('click', () => onSelect(product.id));

  return card;
}

export function renderEras(eras) {
  const grid = document.getElementById('eras-grid');
  if (!grid) return;

  grid.replaceChildren(...eras.map(createEraCard));
}

export function renderProducts(products, onSelect) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.replaceChildren(...products.map(product => createProductCard(product, onSelect)));
}
