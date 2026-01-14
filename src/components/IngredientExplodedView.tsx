import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './IngredientExplodedView.css';
import type { ExplodedProductConfig } from '../data/explodedViewConfig';

interface Props {
    config: ExplodedProductConfig;
    onClose: () => void;
    enable3D?: boolean;
}

const IngredientExplodedView: React.FC<Props> = ({ config, onClose, enable3D = true }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const labelsRef = useRef<HTMLDivElement>(null);

    // State
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [show3D, setShow3D] = useState(false);

    // Check if mobile based on width
    const isMobile = dimensions.width > 0 && dimensions.width <= 768;

    // Reset 3D state when config changes
    useEffect(() => {
        setShow3D(false);
    }, [config]);

    // Asegurar que el modal quede visible en la posición actual del viewport
    useEffect(() => {
        // Guardar la posición actual del scroll
        const scrollY = window.scrollY;

        // Prevenir scroll en el body mientras el modal está abierto
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        // Cleanup: restaurar el scroll cuando se cierra el modal
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollY);
        };
    }, []);

    // Load model-viewer script
    useEffect(() => {
        if (enable3D && !document.querySelector('script[src*="model-viewer"]')) {
            const script = document.createElement('script');
            script.type = 'module';
            script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
            document.body.appendChild(script);
        }
    }, [enable3D]);

    // Update dimensions on mount and resize
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Animation Sequence
    useEffect(() => {
        // Esperar a que los elementos estén renderizados
        if (!containerRef.current || dimensions.width === 0) return;

        // Verificar que los elementos necesarios existan
        const hasImage = imageRef.current && !show3D;
        const lines = svgRef.current?.querySelectorAll('path');
        const hasLines = lines && lines.length > 0;
        const labels = labelsRef.current?.children;
        const hasLabels = labels && labels.length > 0;

        if (!hasImage && !hasLines && !hasLabels) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // 1. Initial Image Animation (Common to both)
            if (imageRef.current && !show3D) {
                tl.fromTo(imageRef.current,
                    {
                        scale: 0.3,
                        opacity: 0,
                        rotation: -25
                    },
                    {
                        scale: 1.15,
                        opacity: 1,
                        rotation: 5,
                        duration: 0.6,
                        ease: 'power3.out'
                    }
                )
                    .to(imageRef.current, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.6,
                        ease: 'elastic.out(1, 0.5)'
                    })
                    .to(imageRef.current, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power2.inOut',
                        yoyo: true,
                        repeat: 1
                    })
                    .to(imageRef.current, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.inOut'
                    });
            }

            const lines = svgRef.current?.querySelectorAll('path');
            const circles = svgRef.current?.querySelectorAll('circle');
            const labels = labelsRef.current?.children;

            if (isMobile) {
                // --- MOBILE ANIMATION (Sequential & Slower) ---
                if (lines && lines.length > 0 && labels && labels.length > 0) {
                    // Start after image animation or immediately if 3D
                    const startDelay = show3D ? 0.2 : 0;

                    // Iterate through each ingredient to create a sequence
                    lines.forEach((line, i) => {
                        const label = labels[i];
                        const circle = circles ? circles[i] : null;

                        // 1. Draw Line (Very Fast)
                        tl.fromTo(line,
                            { strokeDasharray: 600, strokeDashoffset: 600, opacity: 0 },
                            { strokeDashoffset: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
                            i === 0 ? 0.1 : ">-0.25" // Start immediately at 0.1s (parallel to image), then chain
                        );

                        // 1b. Show Circle (Pop in when line done)
                        if (circle) {
                            tl.fromTo(circle,
                                { scale: 0, opacity: 0 },
                                { scale: 1, opacity: 1, duration: 0.2, ease: 'back.out(2)' },
                                ">-0.1"
                            );
                        }

                        // 2. Fade in Label (Snap in)
                        if (label) {
                            tl.fromTo(label,
                                { y: 10, opacity: 0, scale: 0.95 },
                                { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
                                "<"
                            );
                        }
                    });
                }

            } else {
                // --- DESKTOP ANIMATION (Original / Staggered) ---
                if (lines && lines.length > 0) {
                    tl.fromTo(lines,
                        { strokeDasharray: 500, strokeDashoffset: 500, opacity: 0 },
                        { strokeDashoffset: 0, opacity: 1, duration: 0.6, stagger: 0.05 },
                        show3D ? 0 : 0.5
                    );
                }

                if (labels && labels.length > 0) {
                    tl.fromTo(labels,
                        { y: 20, opacity: 0, scale: 0.8 },
                        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.05 },
                        "<" // Labels start with lines
                    );
                }
            }

        }, containerRef);

        return () => ctx.revert();
    }, [dimensions, show3D, config]); // Re-run when config changes

    return (
        <div className="iev-container" ref={containerRef}>
            <h2 className="iev-title">{config.name}</h2>

            {/* 3D Toggle Button */}
            {enable3D && (
                <button
                    className="iev-3d-btn-new"
                    onClick={() => setShow3D(!show3D)}
                    aria-label="Alternar vista 3D"
                >
                    <iframe
                        src="https://lottie.host/embed/7ae74040-aac6-4c39-9ffa-559e8a1f4c60/ZEdWR7FqTN.lottie"
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            background: 'transparent',
                            transform: 'scale(1.5)',
                            pointerEvents: 'none'
                        }}
                    ></iframe>
                </button>
            )}

            <div className="iev-image-wrapper">
                {show3D ? (
                    React.createElement('model-viewer' as any, {
                        src: config.modelUrl,
                        alt: config.name + ' 3D',
                        'camera-controls': true,
                        'auto-rotate': true,
                        'auto-rotate-delay': '0',
                        ar: false,
                        style: { width: '100%', height: '100%', background: 'transparent', outline: 'none' },
                        'shadow-intensity': '1.5',
                        'shadow-softness': '1',
                        exposure: '2',
                        'camera-orbit': config.cameraOrbit,
                        'field-of-view': '25deg',
                        'interaction-prompt': 'none',
                        'disable-pan': true
                    })
                ) : (
                    <img
                        ref={imageRef}
                        src={config.image}
                        alt={config.name}
                        className="iev-product-image"
                    />
                )}
            </div>

            <svg
                className="iev-svg-overlay"
                ref={svgRef}
                style={{ opacity: show3D ? 0.3 : 1, transition: 'opacity 0.5s' }}
            >
                {dimensions.width > 0 && config.ingredients.map((ing) => {
                    const xPercent = (isMobile && ing.mobileX) ? ing.mobileX : ing.x;
                    const yPercent = (isMobile && ing.mobileY) ? ing.mobileY : ing.y;
                    const activeAlign = (isMobile && ing.mobileAlign) ? ing.mobileAlign : ing.align;

                    const centerX = dimensions.width / 2;
                    const centerY = dimensions.height / 2;

                    const originalLabelX = (xPercent / 100) * dimensions.width;
                    const originalLabelY = (yPercent / 100) * dimensions.height;

                    const startX = centerX + (xPercent > 50 ? 20 : -20);
                    const startY = centerY + (yPercent - 50) * 0.5;

                    const dx = originalLabelX - startX;
                    const dy = originalLabelY - startY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    let lineEndDistance = distance;
                    if (isMobile) {
                        // Shorten line by 20px generally
                        let reduction = 20;
                        // Special case for Big Burger Tapa de Asado (ID 2) to be even shorter
                        if (config.name === 'Big burger' && ing.id === 2) {
                            reduction = 45;
                        }
                        lineEndDistance = Math.max(0, distance - reduction);
                    } else if (!isMobile && activeAlign === 'left') {
                        // Desktop Left align tweaks
                        // Para "Big burger", "Doble bacon" (id: 3) necesita estar más cerca
                        if (config.name === 'Big burger' && ing.id === 3) {
                            lineEndDistance = distance * 0.7;
                        }
                        // Para "Mexican pibil pork", "Achiote con porotos negros" (id: 2) necesita estar más cerca
                        else if (config.name === 'Mexican pibil pork' && ing.id === 2) {
                            lineEndDistance = distance * 0.7;
                        }
                        // Para "Vacio y provoleta", "Morrón salteado a fuego lento" (id: 3) necesita estar más cerca
                        else if (config.name === 'Vacio y provoleta' && ing.id === 3) {
                            lineEndDistance = distance * 0.7;
                        }
                        // Para "American chicken", "Mar de cheddar" (id: 3) necesita estar más cerca
                        else if (config.name === 'American chicken' && ing.id === 3) {
                            lineEndDistance = distance * 0.7;
                        }
                        else if (ing.id === 1 || ing.id === 4 || ing.id === 5) {
                            lineEndDistance = distance * 0.7;
                        } else {
                            lineEndDistance = distance * 0.8;
                        }
                    } else if (!isMobile && activeAlign === 'right') {
                        lineEndDistance = distance * 0.8;
                    }

                    const unitX = distance > 0 ? dx / distance : 0;
                    const unitY = distance > 0 ? dy / distance : 0;
                    const targetX = startX + unitX * lineEndDistance;
                    const targetY = startY + unitY * lineEndDistance;

                    const controlX = (startX + targetX) / 2;
                    const controlY = startY;

                    return (
                        <React.Fragment key={`line-${ing.id}`}>
                            <path
                                d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${targetX} ${targetY}`}
                                fill="none"
                                stroke="#ffb700"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <circle
                                cx={targetX}
                                cy={targetY}
                                r="5"
                                fill="#ffb700"
                                stroke="white"
                                strokeWidth="2"
                                style={{ filter: 'drop-shadow(0 0 4px rgba(255, 183, 0, 0.8))' }}
                            />
                        </React.Fragment>
                    );
                })}
            </svg>

            <div className="iev-labels" ref={labelsRef}>
                {dimensions.width > 0 && config.ingredients.map((ing) => {
                    const xPercent = (isMobile && ing.mobileX) ? ing.mobileX : ing.x;
                    const yPercent = (isMobile && ing.mobileY) ? ing.mobileY : ing.y;
                    const activeAlign = (isMobile && ing.mobileAlign) ? ing.mobileAlign : ing.align;

                    const centerX = dimensions.width / 2;
                    const centerY = dimensions.height / 2;

                    const originalLabelX = (xPercent / 100) * dimensions.width;
                    const originalLabelY = (yPercent / 100) * dimensions.height;

                    const startX = centerX + (xPercent > 50 ? 20 : -20);
                    const startY = centerY + (yPercent - 50) * 0.5;

                    const dx = originalLabelX - startX;
                    const dy = originalLabelY - startY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    let labelXPercent = xPercent;
                    let labelYPercent = yPercent;

                    if (!isMobile) {
                        let lineEndDistance = distance;
                        if (activeAlign === 'left') {
                            // Para "Big burger", "Doble bacon" (id: 3) necesita estar más cerca
                            if (config.name === 'Big burger' && ing.id === 3) {
                                lineEndDistance = distance * 0.7;
                            }
                            // Para "Mexican pibil pork", "Achiote con porotos negros" (id: 2) necesita estar más cerca
                            else if (config.name === 'Mexican pibil pork' && ing.id === 2) {
                                lineEndDistance = distance * 0.7;
                            }
                            // Para "Vacio y provoleta", "Morrón salteado a fuego lento" (id: 3) necesita estar más cerca
                            else if (config.name === 'Vacio y provoleta' && ing.id === 3) {
                                lineEndDistance = distance * 0.7;
                            }
                            // Para "American chicken", "Mar de cheddar" (id: 3) necesita estar más cerca
                            else if (config.name === 'American chicken' && ing.id === 3) {
                                lineEndDistance = distance * 0.7;
                            }
                            else if (ing.id === 1 || ing.id === 4 || ing.id === 5) {
                                lineEndDistance = distance * 0.7;
                            } else {
                                lineEndDistance = distance * 0.8;
                            }
                        } else if (activeAlign === 'right') {
                            lineEndDistance = distance * 0.8;
                        }

                        const unitX = distance > 0 ? dx / distance : 0;
                        const unitY = distance > 0 ? dy / distance : 0;
                        const lineEndX = startX + unitX * lineEndDistance;
                        const lineEndY = startY + unitY * lineEndDistance;

                        labelXPercent = (lineEndX / dimensions.width) * 100;
                        labelYPercent = (lineEndY / dimensions.height) * 100;
                    }

                    const commonStyle: React.CSSProperties = {
                        position: 'absolute',
                        top: `${labelYPercent}%`,
                        left: `${labelXPercent}%`,
                        transform: 'translate(-50%, -50%)',
                    };

                    // En móvil, ajustar las posiciones para evitar que se salgan del contenedor
                    if (isMobile) {
                        let finalXPercent = labelXPercent;

                        // Ajustar posición si está muy cerca de los bordes
                        if (activeAlign === 'left' && labelXPercent < 30) {
                            finalXPercent = 30;
                            commonStyle.left = `${finalXPercent}%`;
                        } else if (activeAlign === 'right' && labelXPercent > 70) {
                            finalXPercent = 70;
                            commonStyle.left = `${finalXPercent}%`;
                        }

                        // Calcular el ancho máximo disponible basado en la posición final
                        const leftPixels = (finalXPercent / 100) * dimensions.width;
                        const rightPixels = dimensions.width - leftPixels;

                        if (activeAlign === 'left') {
                            // Para left align, asegurar que no se salga por la izquierda
                            const maxWidth = Math.min(leftPixels - 15, dimensions.width * 0.35);
                            commonStyle.maxWidth = `${maxWidth}px`;
                            commonStyle.transform = 'translate(-100%, -50%)';
                            commonStyle.textAlign = 'right';
                        } else if (activeAlign === 'right') {
                            // Para right align, asegurar que no se salga por la derecha
                            const maxWidth = Math.min(rightPixels - 15, dimensions.width * 0.35);
                            commonStyle.maxWidth = `${maxWidth}px`;
                            commonStyle.transform = 'translate(0%, -50%)';
                            commonStyle.textAlign = 'left';
                        } else if (activeAlign === 'center') {
                            const maxWidth = Math.min(dimensions.width * 0.5, 200);
                            commonStyle.maxWidth = `${maxWidth}px`;
                            commonStyle.transform = 'translate(-50%, -50%)';
                            commonStyle.textAlign = 'center';
                        }
                    } else {
                        // Desktop mantiene el comportamiento original
                        if (activeAlign === 'left') {
                            commonStyle.transform = 'translate(-100%, -50%)';
                            commonStyle.textAlign = 'right';
                        } else if (activeAlign === 'right') {
                            commonStyle.transform = 'translate(0%, -50%)';
                            commonStyle.textAlign = 'left';
                        } else if (activeAlign === 'center') {
                            commonStyle.transform = 'translate(-50%, -50%)';
                            commonStyle.textAlign = 'center';
                            commonStyle.width = '200px';
                        }
                    }

                    return (
                        <div key={ing.id} className="iev-label-item" style={commonStyle}>
                            <div className="iev-label-content" style={{ alignItems: activeAlign === 'left' ? 'flex-end' : (activeAlign === 'center' ? 'center' : 'flex-start'), display: 'flex', flexDirection: 'column' }}>
                                <span className="iev-label-text" style={{
                                    paddingRight: activeAlign === 'left' ? '12px' : 0,
                                    paddingLeft: activeAlign === 'right' ? '12px' : 0
                                }} >{ing.name}</span>
                                <div className="iev-label-underline" style={{
                                    width: '100%',
                                    marginRight: activeAlign === 'left' ? '5px' : 0,
                                    marginLeft: activeAlign === 'right' ? '5px' : 0
                                }}></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="iev-close-btn" onClick={onClose}>
                &times;
            </button>
        </div>
    );
};

export default IngredientExplodedView;
