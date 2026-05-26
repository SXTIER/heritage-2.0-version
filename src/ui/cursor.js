export function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animateCursor() {
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}
