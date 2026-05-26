import { createElement } from './dom.js';

function createSpecRow([key, value]) {
  const row = createElement('div', 'spec-row');
  row.append(
    createElement('span', 'spec-key', key),
    createElement('span', 'spec-val', value)
  );

  return row;
}

export function createModalController(pieces) {
  const modalOverlay = document.getElementById('modal');
  const modal = document.querySelector('#modal .modal');
  const modalImage = document.getElementById('modal-image-img');
  const modalSpecs = document.getElementById('modal-specs');

  function openModal(id) {
    const piece = pieces[id];
    if (!piece || !modalOverlay || !modal || !modalImage || !modalSpecs) return;

    document.getElementById('modal-era').textContent = piece.era;
    document.getElementById('modal-name').textContent = piece.name;
    document.getElementById('modal-desc').textContent = piece.desc;
    modalImage.src = piece.image || '';
    modalImage.alt = piece.imageAlt || piece.name;
    modalImage.hidden = !piece.image;
    modal.dataset.piece = id;
    modalSpecs.replaceChildren(...piece.specs.map(createSpecRow));
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;

    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function scrollToInquiry() {
    closeModal();
    document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
  }

  modalOverlay?.addEventListener('click', event => {
    if (event.target === modalOverlay) closeModal();
  });
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal-back')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
  });

  return {
    openModal,
    closeModal,
    scrollToInquiry
  };
}
