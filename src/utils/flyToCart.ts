export function flyToCart(sourceEl: HTMLElement, targetEl: HTMLElement, opts?: {
  durationMs?: number;
  arcHeight?: number; // desplazamiento hacia arriba de la curva
  maxCloneSize?: number;
}) {
  try {
    const duration = Math.max(420, Math.min(1200, opts?.durationMs ?? 720));
    const arcHeight = opts?.arcHeight ?? 120;
    const maxCloneSize = opts?.maxCloneSize ?? 120;

    const src = sourceEl.getBoundingClientRect();
    const dst = targetEl.getBoundingClientRect();

    // Crear clon elegante (imagen si existe)
    const clone = (sourceEl instanceof HTMLImageElement ? sourceEl.cloneNode(true) : document.createElement('div')) as HTMLElement;
    const size = Math.min(maxCloneSize, Math.max(56, Math.min(src.width, src.height)));
    if (!(clone instanceof HTMLImageElement)) {
      clone.style.background = 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.7), rgba(255, 215, 0, 0.9))';
      clone.style.border = '1px solid rgba(255,255,255,0.6)';
      clone.style.borderRadius = '16px';
    }
    clone.style.width = `${size}px`;
    clone.style.height = `${size}px`;
    clone.style.position = 'fixed';
    clone.style.left = `${src.left + src.width / 2}px`;
    clone.style.top = `${src.top + src.height / 2}px`;
    clone.style.transform = 'translate(-50%, -50%) scale(1)';
    clone.style.zIndex = '99999';
    clone.style.pointerEvents = 'none';
    clone.style.filter = 'drop-shadow(0 10px 24px rgba(0,0,0,.35))';

    document.body.appendChild(clone);

    // Calcular puntos de la curva (2 keyframes intermedios para simular bezier)
    const startX = src.left + src.width / 2;
    const startY = src.top + src.height / 2;
    const endX = dst.left + dst.width / 2;
    const endY = dst.top + dst.height / 2;
    const dx = endX - startX;
    const dy = endY - startY;
    // Punto de control elevado hacia arriba (arco elegante)
    const midX = startX + dx * 0.5;
    const midY = startY + dy * 0.5 - Math.max(arcHeight, Math.abs(dx) * 0.2);

    const rotateDeg = (Math.random() * 18 - 9).toFixed(2);

    const anim = clone.animate(
      [
        { transform: 'translate(-50%, -50%) translate(0px, 0px) scale(1)', opacity: 1, filter: 'drop-shadow(0 10px 24px rgba(0,0,0,.35)) blur(0px)' },
        { offset: 0.55, transform: `translate(-50%, -50%) translate(${midX - startX}px, ${midY - startY}px) scale(0.88) rotate(${rotateDeg}deg)`, opacity: 0.96, filter: 'drop-shadow(0 8px 18px rgba(0,0,0,.3)) blur(0.5px)' },
        { transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(0.26) rotate(${rotateDeg}deg)`, opacity: 0.0, filter: 'drop-shadow(0 6px 12px rgba(0,0,0,.25)) blur(1px)' }
      ],
      {
        duration,
        easing: 'cubic-bezier(.22,1,.36,1)'
      }
    );

    anim.onfinish = () => {
      // Limpieza del clon
      if (clone && clone.parentNode) clone.parentNode.removeChild(clone);

      // Efecto "burst" sutil sobre el botón del carrito
      try {
        const ring = document.createElement('div');
        const ringSize = 44;
        ring.style.position = 'fixed';
        ring.style.left = `${endX}px`;
        ring.style.top = `${endY}px`;
        ring.style.width = `${ringSize}px`;
        ring.style.height = `${ringSize}px`;
        ring.style.borderRadius = '50%';
        ring.style.border = '2px solid rgba(255, 215, 0, 0.85)';
        ring.style.transform = 'translate(-50%, -50%) scale(0.6)';
        ring.style.opacity = '0.9';
        ring.style.zIndex = '100000';
        ring.style.pointerEvents = 'none';
        document.body.appendChild(ring);

        ring.animate([
          { transform: 'translate(-50%, -50%) scale(0.6)', opacity: 0.9 },
          { transform: 'translate(-50%, -50%) scale(1.2)', opacity: 0.0 }
        ], { duration: 360, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => {
          if (ring.parentNode) ring.parentNode.removeChild(ring);
        };
      } catch {}

      // Pequeño "bounce" del carrito
      try {
        targetEl.animate([
          { transform: 'scale(1)', filter: 'brightness(1)' },
          { transform: 'scale(1.12)', filter: 'brightness(1.05)' },
          { transform: 'scale(1)', filter: 'brightness(1)' }
        ], { duration: 320, easing: 'cubic-bezier(.2,.8,.2,1)' });
      } catch {}
    };

    // Seguridad por si no dispara finish
    setTimeout(() => {
      try { if (clone && clone.parentNode) clone.parentNode.removeChild(clone); } catch {}
    }, duration + 200);
  } catch {
    // Silenciar errores de animación
  }
}


