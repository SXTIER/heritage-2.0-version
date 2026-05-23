// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// Play the provenance video as soon as the section enters view.
const aboutSection = document.getElementById('about');
const aboutVideo = document.querySelector('.about-video');
if (aboutSection && aboutVideo) {
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutVideo.play().catch(() => { });
      } else {
        aboutVideo.pause();
      }
    });
  }, { threshold: 0.25 });

  videoObserver.observe(aboutSection);
}

// Eras
const eras = [
  {
    year: '1714-1837',
    name: 'Georgian',
    body: 'Rare, hand made, old mine cut diamond',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&q=80',
    alt: 'Georgian Jewelry'
  },
  {
    year: '1837-1901',
    name: 'Victorian',
    body: 'Emotional, symbolic, storytelling',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=80',
    alt: 'Victorian Jewelry'
  },
  {
    year: '1871-1914',
    name: 'Belle Époque',
    body: 'Ultra elegant, ribbon, floral',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=900&q=80',
    alt: 'Belle Époque Jewelry'
  },
  {
    year: '1890-1910',
    name: 'Art Nouveau',
    body: 'Artistic, sensual, organic',
    image: 'https://www.invaluable.com/blog/wp-content/uploads/sites/77/2019/10/art-nouveau-jewelry-butterfly-hero.jpg',
    alt: 'Art Nouveau Jewelry'
  },
  {
    year: '1901-1915',
    name: 'Edwardian',
    body: 'Royal, refined, effortless elegance',
    image: 'https://d17anp2eo56k6j.cloudfront.net/media/wysiwyg/about-era-pages/edwardian_hero_1280x458_cms.jpg',
    alt: 'Edwardian Jewelry'
  },
  {
    year: '1920-1945',
    name: 'Art Deco',
    body: 'Modern, powerful, strong luxury',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80',
    alt: 'Art Deco Jewelry'
  }
];

// Collection
const products = [
  {
    id: 'victorian-ring',
    era: 'Victorian Era · 1837-1901',
    name: 'Old Cut Diamond Tiara',
    image: '/images/collections/old-cut-diamond-tiara.jpeg',
    alt: 'Old Cut Diamond Tiara'
  },
  {
    id: 'art-deco-bracelet',
    era: 'Art Deco · 1920-1945',
    name: 'Ruby & Diamond Bracelet',
    image: '/images/collections/Ruby-and-Diamond-Bracelet.jpeg',
    alt: 'Ruby & Diamond Bracelet'
  },
  {
    id: 'edwardian-brooch',
    era: 'Edwardian · 1901-1975',
    name: 'Pearl Brooch',
    image: '/images/collections/Edwardian.jpeg',
    alt: 'Pearl Brooch'
  },
  {
    id: 'belle-necklace',
    era: 'Belle Époque · c.1900',
    name: 'Diamond Rivière Necklace',
    image: '/images/collections/Belle-epoque-3.jpeg',
    placeholder: 'jp-necklace'
  },
  {
    id: 'art-nouveau-earrings',
    era: 'Art Nouveau · c.1895',
    name: 'Emerald Drop Earrings',
    // image: '/images/collections/Belle-epoque-3.jpeg',
    placeholder: 'jp-earring'
  }
];

function renderEras() {
  const grid = document.getElementById('eras-grid');
  if (!grid) return;

  grid.innerHTML = eras.map(era => `
      <div class="era reveal">
        <div class="era-img">
          <img src="${era.image}" alt="${era.alt}" />
        </div>
        <div class="era-info">
          <div class="era-yr">${era.year}</div>
          <div class="era-nm">${era.name}</div>
          <div class="era-bd">${era.body}</div>
        </div>
      </div>
    `).join('');
}

function renderProductMedia(product) {
  if (product.image) {
    return `<img class="product-image" src="${product.image}" alt="${product.alt}" />`;
  }

  if (product.placeholder === 'jp-necklace') {
    return `
        <div class="jewelry-placeholder jp-necklace">
          <div style="position:absolute;width:80px;height:100px;border:1px solid rgba(201,168,76,0.4);transform:rotate(45deg);background:rgba(201,168,76,0.05)"></div>
        </div>
      `;
  }

  return `
      <div class="jewelry-placeholder jp-earring">
        <div style="position:absolute;display:flex;gap:30px">
          <div style="width:30px;height:60px;border:1px solid rgba(201,168,76,0.4);border-radius:50%;background:rgba(201,168,76,0.05)"></div>
          <div style="width:30px;height:60px;border:1px solid rgba(201,168,76,0.4);border-radius:50%;background:rgba(201,168,76,0.05)"></div>
        </div>
      </div>
    `;
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = products.map(product => `
      <div class="product-card" onclick="openModal('${product.id}')">
        ${renderProductMedia(product)}
        <div class="product-overlay">
          <div class="product-era">${product.era}</div>
          <div class="product-name">${product.name}</div>
          <button class="product-btn">View Details</button>
        </div>
      </div>
    `).join('');
}

renderEras();
renderProducts();

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 100);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

// Modal data
const pieces = {
  // Card 1
  'victorian-ring': {
    era: 'Victorian Era · 1837-1901',
    name: 'Diamond Cluster Ring\nOld Mine Cut',
    image: '/images/collections/old-cut-diamond-tiara.jpeg',
    imageAlt: 'old-cut-diamond-tiara',
    desc: 'A magnificent  of Victorian jewellery craftsmanship. The central old  cut diamond and pear shaped diamond, estimated at 8 carats, is surrounded by a cluster of single-cut diamonds set in 18k gold.',
    specs: [['Period', 'Victorian, 1837-1901'], ['Origin', 'London, England'], ['Metal', '18k Gold'], ['Stones', 'Old Mine Cut Diamond, Old cut Diamonds'], ['Condition', 'Excellent, original patina']]
  },
  // Card 2
  'art-deco-bracelet': {
    era: 'Art Deco · 1920-1945',
    name: 'Ruby & Diamond\nBracelet',
    image: '/images/collections/Ruby-and-Diamond-Bracelet.jpeg',
    imageAlt: 'Ruby and Diamond Bracelet',
    desc: ' A stunning Art Deco line bracelet featuring alternating old European cut diamonds and burma ruby, set in 18k gold with  detailing. The geometric precision and characteristic stepped design are hallmarks of the finest Parisian jewellery of the 1920s.',
    specs: [['Period', 'Art Deco, 1920-1945'], ['Origin', 'Paris, France'], ['Metal', '18k Gold'], ['Stones', 'Old Cut Diamonds,Burmese Ruby'], ['Length', '18cm']]
  },
  // Card 3
  'edwardian-brooch': {
    era: 'Edwardian · 1901-1975',
    name: 'Pearl Brooch',
    image: '/images/collections/Edwardian.jpeg',
    imageAlt: 'Pearl Brooch',
    desc: "A magnificent Edwardian bracelet of extraordinary breadth and brilliance, set throughout with old European cut diamonds of exceptional size and whiteness. The construction — so fine and so supple that it drapes at the wrist as though woven from light — represents the very pinnacle of the Edwardian jeweller's art, a period in which platinum and the knife- wire technique were used together for the first and last time in history with such consummate mastery.Each of the principal diamonds is bezel- set at the intersection of the design, allowing the stones to move freely and catch the light from every angle, while the surrounding brilliants trace their garland paths with a lacy precision that no modern hand could replicate.Presented in its original fitted case, the bracelet retains the quiet dignity of a piece that has passed through time untouched — a rare and singular survivor of one of the greatest eras in the history of European jewellery.",
    specs: [['Period', 'Edwardian, 1901-1975'], ['Origin', 'England'], ['Metal', '18k Gold'], ['Stones', 'Old Cut Diamonds, Natural Pearls'], ['Condition', 'Excellent']]
  },
  // Card 4
  'belle-necklace': {
    era: 'Belle Époque · c.1900',
    name: 'Diamond Riviére\nNecklace',
    image: '/images/collections/Belle-epoque-3.jpeg',
    imageAlt: 'Diamond Rivière Necklace',
    desc: 'A supremely rare and theatrical pair of French chandelier earrings of exceptional scale and artistry, conceived in the form of the magnolia in full bloom — that most fleeting and romantic of flowers — and executed with a bravura that places them among the most ambitious jewels of their age.',
    specs: [['Period', 'Belle Époque, c.1900'], ['Origin', 'France'], ['Metal', 'Silver-topped 18ct Gold'], ['Total Diamond Weight', 'Approx. 12 carats'], ['Diamonds', '23 Old European Cut']]
  },
  // Card 5
  'art-nouveau-earrings': {
    era: 'Art Nouveau · c.1895',
    name: 'Colombian Emerald\nDrop Earrings',
    image: '/images/collections/Diamond-Cluster-Old.jpeg',
    imageAlt: 'Diamond Cluster Old Mine Cut',
    desc: 'this brooch captures the Art Nouveau movement at its most naturalistic — the moment when jewellery stopped imitating nature and became it. The rose-cut diamonds at each bloom, set in silver against the warmth of the gold beneath, carry the particular softness that only stones of this age and cut possess. A piece of quiet, exceptional beauty, presented in its original velvet case.',
    specs: [['Period', 'Art Nouveau, c.1895'], ['Origin', 'Belgium'], ['Metal', '18ct Yellow Gold'], ['Stones', 'Colombian Emeralds, Old Cut Diamonds'], ['Emerald Weight', 'Approx. 3.2ct total']]
  }
};

function openModal(id) {
  const p = pieces[id];
  if (!p) return;
  document.getElementById('modal-era').textContent = p.era;
  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-desc').textContent = p.desc;
  const modalImage = document.getElementById('modal-image-img');
  modalImage.src = p.image || '';
  modalImage.alt = p.imageAlt || p.name;
  modalImage.hidden = !p.image;
  document.querySelector('#modal .modal').dataset.piece = id;
  const specs = document.getElementById('modal-specs');
  specs.innerHTML = p.specs.map(([k, v]) =>
    `<div class="spec-row"><span class="spec-key">${k}</span><span class="spec-val">${v}</span></div>`
  ).join('');
  document.getElementById('modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.body.style.overflow = '';
}

function inquireModal() {
  closeModal();
  document.getElementById('inquiry').scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('modal').addEventListener('click', e => {
  if (e.target === document.getElementById('modal')) closeModal();
});

function submitForm() {
  const btn = document.querySelector('.form-submit');
  btn.textContent = '✦ Enquiry Sent — We Will Be In Touch';
  btn.style.background = 'rgba(201,168,76,0.3)';
  btn.style.color = 'var(--gold)';
  btn.style.border = '1px solid rgba(201,168,76,0.4)';
  btn.disabled = true;
}

// Close modal on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

window.openModal = openModal;
window.closeModal = closeModal;
window.inquireModal = inquireModal;
window.submitForm = submitForm;
