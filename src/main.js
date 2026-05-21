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

  // Play the provenance video as soon as the section enters view.
  const aboutSection = document.getElementById('about');
  const aboutVideo = document.querySelector('.about-video');
  if (aboutSection && aboutVideo) {
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutVideo.play().catch(() => {});
        } else {
          aboutVideo.pause();
        }
      });
    }, { threshold: 0.25 });

    videoObserver.observe(aboutSection);
  }

  // Modal data
  const pieces = {
    'victorian-ring': {
      era: 'Victorian Era · c.1880',
      name: 'Diamond Cluster Ring\nOld Mine Cut',
      image: '/images/collections/Diamond-Cluster-Old.jpeg',
      imageAlt: 'Diamond Cluster Old Mine Cut',
      desc: '.',
      specs: [['Period','Victorian, c.1880'],['Origin','London, England'],['Metal','18ct Gold & Silver'],['Stones','Old Mine Cut Diamond, Rose-cut Diamonds'],['Condition','Excellent, original patina']]
    },
    'art-deco-bracelet': {
      era: 'Art Deco · c.1925',
      name: 'Ruby & Diamond\nBracelet',
      image: '/images/collections/Ruby-and-Diamond-Bracelet.jpeg',
      imageAlt: 'Ruby and Diamond Bracelet',
      desc: '.',
      specs: [['Period','Art Deco, c.1925'],['Origin','Paris, France'],['Metal','Platinum'],['Stones','Old European Cut Diamonds, Burmese Sapphires'],['Length','18cm']]
    },
    'edwardian-brooch': {
      era: 'Edwardian · c.1905',
      name: 'Platinum & Pearl\nGarland Brooch',
      image: '/images/collections/Diamond-Cluster-Old.jpeg',
      imageAlt: 'Diamond Cluster Old Mine Cut',
      desc: '.',
      specs: [['Period','Edwardian, c.1905'],['Origin','England'],['Metal','Platinum & 18ct Gold'],['Stones','Old Cut Diamonds, Natural Pearls'],['Condition','Excellent']]
    },
    'belle-necklace': {
      era: 'Belle Époque · c.1900',
      name: 'Diamond Riviére\nNecklace',
      image: '/images/collections/Diamond-Cluster-Old.jpeg',
      imageAlt: 'Diamond Cluster Old Mine Cut',
      desc: '.',
      specs: [['Period','Belle Époque, c.1900'],['Origin','France'],['Metal','Silver-topped 18ct Gold'],['Total Diamond Weight','Approx. 12 carats'],['Diamonds','23 Old European Cut']]
    },
    'art-nouveau-earrings': {
      era: 'Art Nouveau · c.1895',
      name: 'Colombian Emerald\nDrop Earrings',
      image: '/images/collections/Diamond-Cluster-Old.jpeg',
      imageAlt: 'Diamond Cluster Old Mine Cut',
      desc: '.',
      specs: [['Period','Art Nouveau, c.1895'],['Origin','Belgium'],['Metal','18ct Yellow Gold'],['Stones','Colombian Emeralds, Old Cut Diamonds'],['Emerald Weight','Approx. 3.2ct total']]
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
    const specs = document.getElementById('modal-specs');
    specs.innerHTML = p.specs.map(([k,v]) =>
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
