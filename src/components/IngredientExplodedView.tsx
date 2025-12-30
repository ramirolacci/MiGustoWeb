import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './IngredientExplodedView.css';

// Mock Data for the prototype
const MOCK_PRODUCT = {
    id: 'cheeseburger-001',
    name: 'Cheeseburger',
    // Using a clear, high-quality burger image with transparency for the "exploded" effect
    // Should match the 3D model roughly in appearance
    image: '/images/final/empanada-cheese-burger.png',
    modelUrl: '/models/cheese-burger-3D.glb', // Assuming this path based on previous files
    cameraOrbit: '180deg 100deg 2.9m', // Copied from MobileProductDetail
    ingredients: [
        /* Fixed Ordered Mobile Layout: 
           Strategy: 
           - Top Center: Salsa BBQ
           - Top Sides: Cheedar & Blend
           - Bottom Sides: Bacon & Vacio
           - Alignments set to ensure text grows INWARDS (towards center)
        */
        { id: 1, name: 'Salsa bbq', x: 20, y: 15, align: 'left', mobileX: 50, mobileY: 18, mobileAlign: 'center' }, /* Lowered */
        { id: 2, name: 'Mar de\ncheddar', x: 80, y: 30, align: 'right', mobileX: 78, mobileY: 28, mobileAlign: 'left' }, /* Moved Left (88->78) */
        { id: 3, name: 'Doble bacon', x: 85, y: 55, align: 'right', mobileX: 78, mobileY: 82, mobileAlign: 'left' }, /* Moved Left (88->78) and down used space */
        { id: 4, name: 'Blend de\nOjo de Bife', x: 15, y: 50, align: 'left', mobileX: 25, mobileY: 30, mobileAlign: 'right' }, /* Moved further Left (User request) */
        { id: 5, name: 'Vacio', x: 25, y: 80, align: 'left', mobileX: 35, mobileY: 82, mobileAlign: 'left' }, /* Moved Right, Aligned Left to clean overlap */
    ]
};

const IngredientExplodedView: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const labelsRef = useRef<HTMLDivElement>(null);

    // State
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [show3D, setShow3D] = useState(false);

    // Check if mobile based on width
    const isMobile = dimensions.width > 0 && dimensions.width <= 768;

    // Load model-viewer script
    useEffect(() => {
        if (!document.querySelector('script[src*="model-viewer"]')) {
            const script = document.createElement('script');
            script.type = 'module';
            script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
            document.body.appendChild(script);
        }
    }, []);

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
        if (!svgRef.current || !labelsRef.current || (!imageRef.current && !show3D)) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            if (imageRef.current && !show3D) {
                tl.fromTo(imageRef.current,
                    { scale: 0.5, opacity: 0, rotation: -10 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.7)' }
                );
            }

            const lines = svgRef.current?.querySelectorAll('path');
            if (lines) {
                tl.fromTo(lines,
                    { strokeDasharray: 500, strokeDashoffset: 500, opacity: 0 },
                    { strokeDashoffset: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
                    show3D ? 0 : "-=0.5"
                );
            }

            const labels = labelsRef.current?.children;
            if (labels) {
                tl.fromTo(labels,
                    { y: 20, opacity: 0, scale: 0.8 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
                    "<"
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, [dimensions, show3D]); // Add mobilePositions dependecy to re-animate on shuffle

    return (
        <div className="iev-container" ref={containerRef}>
            <h2 className="iev-title">{MOCK_PRODUCT.name}</h2>

            {/* 3D Toggle Button - Re-implemented */}
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

            <div className="iev-image-wrapper">
                {show3D ? (
                    React.createElement('model-viewer' as any, {
                        src: MOCK_PRODUCT.modelUrl,
                        alt: MOCK_PRODUCT.name + ' 3D',
                        'camera-controls': true,
                        'auto-rotate': true,
                        'auto-rotate-delay': '0',
                        ar: false,
                        style: { width: '100%', height: '100%', background: 'transparent', outline: 'none' },
                        'shadow-intensity': '1.5',
                        'shadow-softness': '1',
                        exposure: '2',
                        'camera-orbit': MOCK_PRODUCT.cameraOrbit,
                        'field-of-view': '25deg',
                        'interaction-prompt': 'none',
                        'disable-pan': true
                    })
                ) : (
                    <img
                        ref={imageRef}
                        src={MOCK_PRODUCT.image}
                        alt={MOCK_PRODUCT.name}
                        className="iev-product-image"
                    />
                )}
            </div>

            <svg className="iev-svg-overlay" ref={svgRef} style={{ opacity: show3D ? 0.3 : 1, transition: 'opacity 0.5s' }}>
                {dimensions.width > 0 && MOCK_PRODUCT.ingredients.map((ing) => {
                    // Use fixed mobile positions if mobile
                    const xPercent = (isMobile && ing.mobileX) ? ing.mobileX : ing.x;
                    const yPercent = (isMobile && ing.mobileY) ? ing.mobileY : ing.y;

                    const centerX = dimensions.width / 2;
                    const centerY = dimensions.height / 2;
                    const targetX = (xPercent / 100) * dimensions.width;
                    const targetY = (yPercent / 100) * dimensions.height;

                    // Adjust start point
                    // For mobile, we want lines to look like they come from the image
                    const startX = centerX + (xPercent > 50 ? 20 : -20); // Tighter emission for mobile 
                    const startY = centerY + (yPercent - 50) * 0.5;
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
                {MOCK_PRODUCT.ingredients.map((ing) => {
                    const xPercent = (isMobile && ing.mobileX) ? ing.mobileX : ing.x;
                    const yPercent = (isMobile && ing.mobileY) ? ing.mobileY : ing.y;
                    const activeAlign = (isMobile && ing.mobileAlign) ? ing.mobileAlign : ing.align;

                    const commonStyle: React.CSSProperties = {
                        position: 'absolute',
                        top: `${yPercent}%`,
                        left: `${xPercent}%`,
                        transform: 'translate(-50%, -50%)',
                    };

                    if (activeAlign === 'left') {
                        // "Left" typically means text is to the Left of the Point -> translate(-100%)
                        commonStyle.transform = 'translate(-100%, -50%)';
                        commonStyle.paddingRight = '10px';
                        commonStyle.textAlign = 'right';
                    } else if (activeAlign === 'right') {
                        // Text is to the Right of the Point -> translate(0%)
                        commonStyle.transform = 'translate(0%, -50%)';
                        commonStyle.paddingLeft = '10px';
                        commonStyle.textAlign = 'left';
                    } else if (activeAlign === 'center') {
                        // Centered on point
                        commonStyle.transform = 'translate(-50%, -50%)';
                        commonStyle.textAlign = 'center';
                        commonStyle.width = '200px';
                    }

                    return (
                        <div key={ing.id} className="iev-label-item" style={commonStyle}>
                            <div className="iev-label-content" style={{ alignItems: activeAlign === 'left' ? 'flex-end' : (activeAlign === 'center' ? 'center' : 'flex-start'), display: 'flex', flexDirection: 'column' }}>
                                <span className="iev-label-text">{ing.name}</span>
                                <div className="iev-label-underline" style={{ width: '100%' }}></div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="iev-close-btn" onClick={() => window.history.back()}>
                &times;
            </button>
        </div>
    );
};

export default IngredientExplodedView;
