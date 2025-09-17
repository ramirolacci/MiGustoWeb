export function flyToCart(sourceEl: HTMLElement, targetEl: HTMLElement) {
  try {
    const sourceRect = sourceEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    const clone = (sourceEl instanceof HTMLImageElement ? sourceEl.cloneNode(true) : document.createElement('div')) as HTMLElement;
    if (!(clone instanceof HTMLImageElement)) {
      clone.style.width = `${Math.max(40, Math.min(140, sourceRect.width))}px`;
      clone.style.height = `${Math.max(40, Math.min(140, sourceRect.height))}px`;
      clone.style.background = 'rgba(255,215,0,0.85)';
      clone.style.borderRadius = '50%';
    }

    clone.style.position = 'fixed';
    clone.style.left = `${sourceRect.left + sourceRect.width / 2}px`;
    clone.style.top = `${sourceRect.top + sourceRect.height / 2}px`;
    clone.style.transform = 'translate(-50%, -50%) scale(1)';
    clone.style.zIndex = '99999';
    clone.style.pointerEvents = 'none';
    clone.style.transition = 'transform 0.65s cubic-bezier(0.22, 0.61, 0.36, 1), left 0.65s cubic-bezier(0.22, 0.61, 0.36, 1), top 0.65s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.65s ease';
    clone.style.willChange = 'transform, left, top, opacity';
    clone.style.filter = 'drop-shadow(0 8px 20px rgba(0,0,0,0.35))';

    document.body.appendChild(clone);

    // Forzar reflow para que la transición se aplique
    void clone.getBoundingClientRect();

    const endLeft = targetRect.left + targetRect.width / 2;
    const endTop = targetRect.top + targetRect.height / 2;

    clone.style.left = `${endLeft}px`;
    clone.style.top = `${endTop}px`;
    clone.style.transform = 'translate(-50%, -50%) scale(0.25)';
    clone.style.opacity = '0.85';

    const cleanup = () => {
      if (clone && clone.parentNode) clone.parentNode.removeChild(clone);
    };
    clone.addEventListener('transitionend', cleanup, { once: true });

    // Fallback cleanup
    setTimeout(cleanup, 900);
  } catch {
    // No romper si falla
  }
}


