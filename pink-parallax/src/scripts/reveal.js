// RevealOnScroll — utilidad única de animación de entrada para todo el sitio.
// CSS + un solo IntersectionObserver. Sin dependencias.
//
// Atributos soportados (opt-in desde el markup):
//   [data-reveal]                    elemento que se revela al entrar al viewport (una sola vez)
//   data-reveal="up|left|right|fade" dirección (por defecto: up)
//   style="--reveal-delay: 70ms"     stagger entre elementos hermanos
//   style="--reveal-dur: 450ms"      duración (por defecto: 500ms)
//   [data-reveal-section]            sección con microefecto terminal previo al contenido
//   [data-cmd]                       línea de comando que muestra el loader
//   data-cmd-loading="> loading ..." texto del loader (150–250 ms)
//   [data-reveal-head]               título que se revela al terminar el loader
//
// Los hijos de [data-reveal-section] se observan recién cuando termina el
// loader, para que el título siempre aparezca primero. Si algo falla, se
// desactiva js-anim y todo el contenido queda visible.

const REVEAL_SEL = '[data-reveal]';
const SECTION_SEL = '[data-reveal-section]';
const LOADER_MS = 190;

function init() {
  const root = document.documentElement;

  // Reduced motion o sin IntersectionObserver: nada oculto, nada animado.
  if (!root.classList.contains('js-anim')) return;

  let io;
  try {
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          io.unobserve(el); // animación una sola vez por elemento

          if (el.matches(SECTION_SEL)) runSection(el);
          else el.classList.add('is-revealed');
        }
      },
      // Se revela un poco antes de entrar al viewport para que nunca se
      // perciba retardo; nunca bloquea scroll, clics ni teclado.
      { rootMargin: '0px 0px 80px 0px', threshold: 0 }
    );
  } catch {
    root.classList.remove('js-anim');
    return;
  }

  /** @param {Element} section */
  function runSection(section) {
    const cmd = section.querySelector('[data-cmd]');
    const head = section.querySelector('[data-reveal-head]');
    const loading = cmd ? cmd.getAttribute('data-cmd-loading') : null;

    const revealContent = () => {
      if (head) head.classList.add('is-revealed');
      section.querySelectorAll(REVEAL_SEL).forEach((child) => io.observe(child));
    };

    if (cmd && loading && !section.dataset.loaderDone) {
      section.dataset.loaderDone = '1';
      const original = cmd.innerHTML;
      cmd.textContent = loading;
      window.setTimeout(() => {
        // El texto de carga desaparece exactamente cuando entra el contenido.
        cmd.innerHTML = original;
        revealContent();
      }, LOADER_MS);
    } else {
      revealContent();
    }
  }

  // 1) Secciones con loader.
  document.querySelectorAll(SECTION_SEL).forEach((sec) => io.observe(sec));

  // 2) Resto de elementos, observados de forma individual.
  document.querySelectorAll(REVEAL_SEL).forEach((el) => {
    if (!el.closest(SECTION_SEL)) io.observe(el);
  });

  // Avisa al failsafe del layout de que todo quedó inicializado.
  window.__revealReady = true;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
