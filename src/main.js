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
    era: 'Victorian Era • 1837-1901',
    name: 'Old Cut Diamond Tiara',
    image: '/images/collections/old-cut-diamond-tiara.jpeg',
    alt: 'Old Cut Diamond Tiara'
  },
  {
    id: 'art-deco-bracelet',
    era: 'Art Deco • 1920-1945',
    name: 'Ruby & Diamond Bracelet',
    image: '/images/collections/Ruby-and-Diamond-Bracelet.jpeg',
    alt: 'Ruby & Diamond Bracelet'
  },
  {
    id: 'edwardian-brooch',
    era: 'Edwardian • 1901-1915',
    name: 'Old European Cut Choker and Bracelet',
    image: '/images/collections/Edwardian.jpeg',
    alt: 'Old European Cut Choker and Braceleth'
  },
  {
    id: 'belle-necklace',
    era: 'Belle Époque • 1871-1914',
    name: 'Belle Magnolia Earring',
    image: '/images/collections/Belle-epoque-3.jpeg',
    alt: 'Belle Magnolia Earring'
  },
  {
    id: 'art-nouveau-earrings',
    era: 'Art Nouveau • 1890-1910',
    name: 'An Art Nouveau Style Brooch',
    image: '/images/collections/Diamond-Cluster-Old.jpeg',
    alt: 'An Art Nouveau Style Brooch'
  }
];

function renderEras() {
  const grid = document.getElementById('eras-grid');
  if (!grid) return;

  grid.replaceChildren(...eras.map(era => {
    const card = document.createElement('div');
    card.className = 'era reveal';

    const imageWrap = document.createElement('div');
    imageWrap.className = 'era-img';

    const image = document.createElement('img');
    image.src = era.image;
    image.alt = era.alt;
    imageWrap.append(image);

    const info = document.createElement('div');
    info.className = 'era-info';

    const year = document.createElement('div');
    year.className = 'era-yr';
    year.textContent = era.year;

    const name = document.createElement('div');
    name.className = 'era-nm';
    name.textContent = era.name;

    const body = document.createElement('div');
    body.className = 'era-bd';
    body.textContent = era.body;

    info.append(year, name, body);
    card.append(imageWrap, info);

    return card;
  }));
}

function createProductMedia(product) {
  if (product.image) {
    const image = document.createElement('img');
    image.className = 'product-image';
    image.src = product.image;
    image.alt = product.alt || product.name;
    return image;
  }

  const placeholder = document.createElement('div');

  if (product.placeholder === 'jp-necklace') {
    placeholder.className = 'jewelry-placeholder jp-necklace';
    const diamond = document.createElement('div');
    diamond.style.cssText = 'position:absolute;width:80px;height:100px;border:1px solid rgba(201,168,76,0.4);transform:rotate(45deg);background:rgba(201,168,76,0.05)';
    placeholder.append(diamond);
    return placeholder;
  }

  placeholder.className = 'jewelry-placeholder jp-earring';
  const pair = document.createElement('div');
  pair.style.cssText = 'position:absolute;display:flex;gap:30px';

  for (let i = 0; i < 2; i += 1) {
    const earring = document.createElement('div');
    earring.style.cssText = 'width:30px;height:60px;border:1px solid rgba(201,168,76,0.4);border-radius:50%;background:rgba(201,168,76,0.05)';
    pair.append(earring);
  }

  placeholder.append(pair);
  return placeholder;
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.replaceChildren(...products.map(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.addEventListener('click', () => openModal(product.id));

    const overlay = document.createElement('div');
    overlay.className = 'product-overlay';

    const era = document.createElement('div');
    era.className = 'product-era';
    era.textContent = product.era;

    const name = document.createElement('div');
    name.className = 'product-name';
    name.textContent = product.name;

    const button = document.createElement('button');
    button.className = 'product-btn';
    button.type = 'button';
    button.textContent = 'View Details';

    overlay.append(era, name, button);
    card.append(createProductMedia(product), overlay);

    return card;
  }));
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
    era: 'Victorian Era • 1837-1901',
    name: 'Old Cut Diamond Tiara',
    image: '/images/collections/old-cut-diamond-tiara.jpeg',
    imageAlt: 'old-cut-diamond-tiara',
    desc: 'A magnificent  of Victorian jewellery craftsmanship. The central old cut diamond and pear shaped diamond, estimated at 8 carats, is surrounded by a cluster of single-cut diamonds set in 18k gold.',
    specs: [['Period', 'Victorian, 1837-1901'], ['Origin', 'London, England'], ['Metal', '18k Gold'], ['Stones', 'Old Mine Cut Diamond, Old cut Diamonds'], ['Condition', 'Excellent, original patina']]
  },
  // Card 2
  'art-deco-bracelet': {
    era: 'Art Deco • 1920-1945',
    name: 'Ruby & Diamond\nBracelet',
    image: '/images/collections/Ruby-and-Diamond-Bracelet.jpeg',
    imageAlt: 'Ruby and Diamond Bracelet',
    desc: ' A stunning Art Deco line bracelet featuring alternating old European cut diamonds and burma ruby, set in 18k gold with detailing. The geometric precision and characteristic stepped design are hallmarks of the finest Parisian jewellery of the 1920s.',
    specs: [['Period', 'Art Deco, 1920-1945'], ['Origin', 'Paris, France'], ['Metal', '18k Gold'], ['Stones', 'Old Cut Diamonds,Burmese Ruby'], ['Length', '18cm']]
  },
  // Card 3
  'edwardian-brooch': {
    era: 'Edwardian • 1901-1915',
    name: 'Old European Cut Choker and Bracelet',
    image: '/images/collections/Edwardian.jpeg',
    imageAlt: 'Old European Cut Choker and Bracelet',
    desc: `A magnificent Edwardian bracelet of extraordinary breadth and brilliance, set throughout with old European cut diamonds of exceptional size and whiteness. 
    
    The construction — so fine and so supple that it drapes at the wrist as though woven from light — represents the very pinnacle of the Edwardian jeweller's art, a period in which platinum and the knife- wire technique were used together for the first and last time in history with such consummate mastery.
    
    Each of the principal diamonds is bezel- set at the intersection of the design, allowing the stones to move freely and catch the light from every angle, while the surrounding brilliants trace their garland paths with a lacy precision that no modern hand could replicate.Presented in its original fitted case, the bracelet retains the quiet dignity of a piece that has passed through time untouched — a rare and singular survivor of one of the greatest eras in the history of European jewellery.`,
    specs: [['Period', 'Edwardian, 1901-1915'], ['Origin', 'England'], ['Metal', '18k Gold'], ['Stones', 'Old European Cut Diamonds'], ['Condition', 'Excellent']]
  },
  // Card 4
  'belle-necklace': {
    era: 'Belle Époque • 1871-1914',
    name: 'Belle Magnolia Earring',
    image: '/images/collections/Belle-epoque-3.jpeg',
    imageAlt: 'Belle Magnolia Earring',
    desc: 'A supremely rare and theatrical pair of French chandelier earrings of exceptional scale and artistry, conceived in the form of the magnolia in full bloom โ€” that most fleeting and romantic of flowers — and executed with a bravura that places them among the most ambitious jewels of their age.',
    specs: [['Period', 'Belle Époque, 1871-1914'], ['Origin', 'France'], ['Metal', '18ct Gold'], ['Total Diamond Weight', 'Approx. 9 carats'], ['Diamonds', 'Excellent']]
  },
  // Card 5
  'art-nouveau-earrings': {
    era: 'Art Nouveau • 1890-1910',
    name: 'An Art Nouveau Style Brooch',
    image: '/images/collections/Diamond-Cluster-Old.jpeg',
    imageAlt: 'An Art Nouveau Style Brooch',
    desc: 'this brooch captures the Art Nouveau movement at its most naturalistic — the moment when jewellery stopped imitating nature and became it. The rose-cut diamonds at each bloom, set in silver against the warmth of the gold beneath, carry the particular softness that only stones of this age and cut possess. A piece of quiet, exceptional beauty, presented in its original velvet case.',
    specs: [['Period', 'Art Nouveau, 1890-1910'], ['Origin', 'Belgium'], ['Metal', '18K Gold'], ['Stones', 'Old Cut Diamonds'], ['Condition', 'Excellent']]
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
  specs.replaceChildren(...p.specs.map(([k, v]) => {
    const row = document.createElement('div');
    row.className = 'spec-row';

    const key = document.createElement('span');
    key.className = 'spec-key';
    key.textContent = k;

    const value = document.createElement('span');
    value.className = 'spec-val';
    value.textContent = v;

    row.append(key, value);
    return row;
  }));
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

document.getElementById('modal-close')?.addEventListener('click', closeModal);
document.getElementById('modal-back')?.addEventListener('click', closeModal);
document.getElementById('inquiry-submit')?.addEventListener('click', submitForm);

const ENQUIRY_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyd_1pPZ0fzMdQuWwiy0JHfgVX1pMP-J3ov2XfnOweonjuJllUE82Lb58HT_Jf33u_fxQ/exec';

function setSubmitState(text, disabled = false) {
  const btn = document.querySelector('.form-submit');
  btn.textContent = text;
  btn.style.background = 'rgba(201,168,76,0.3)';
  btn.style.color = 'var(--gold)';
  btn.style.border = '1px solid rgba(201,168,76,0.4)';
  btn.disabled = disabled;
}

function getInquiryPayload() {
  return {
    firstName: document.getElementById('first-name')?.value.trim() || '',
    lastName: document.getElementById('last-name')?.value.trim() || '',
    contact: document.getElementById('contact-method')?.value.trim() || '',
    interest: document.getElementById('interest')?.value || '',
    budget: document.getElementById('budget-range')?.value || '',
    message: document.getElementById('message')?.value.trim() || '',
    submittedAt: new Date().toISOString(),
  };
}

async function submitForm() {
  if (ENQUIRY_ENDPOINT.includes('PASTE_GOOGLE_APPS_SCRIPT')) {
    setSubmitState('Email Setup Needed: Add Apps Script URL');
    return;
  }

  const payload = getInquiryPayload();
  if (!payload.firstName || !payload.contact || !payload.message) {
    setSubmitState('Please Add Name, Contact, and Message');
    return;
  }

  const btn = document.querySelector('.form-submit');
  const defaultText = btn.textContent;
  btn.textContent = 'Sending Enquiry...';
  btn.disabled = true;

  try {
    await fetch(ENQUIRY_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(payload),
    });
    setSubmitState('Enquiry Sent - We Will Be In Touch', true);
  } catch {
    btn.textContent = 'Unable to Send - Please Try Again';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = defaultText;
    }, 3000);
  }
}

// Close modal on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
