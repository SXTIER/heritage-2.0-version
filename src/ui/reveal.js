export function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), index * 100);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(element => observer.observe(element));
}
