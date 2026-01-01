import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 }
}

const renderText = (text, className, baseWeight) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
            {char === " " ? '\u00A0' : char}
        </span>
    ))
}

const setupTextHover = (container, type) => {
    if (!container) return;

    const letters = container.querySelectorAll("span");
    const { min, max, default: defaultWeight } = FONT_WEIGHTS[type];

    const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;

        letters.forEach((letter) => {
            const letterRect = letter.getBoundingClientRect();
            const letterCenterX = letterRect.left - rect.left + letterRect.width / 2;
            const distance = Math.abs(mouseX - letterCenterX);
            const intensity = Math.exp(-(distance ** 2) / 5000);
            const weight = min + (max - min) * intensity;

            gsap.to(letter, {
                duration: 0.3,
                ease: 'power2.out',
                fontVariationSettings: `'wght' ${weight}`
            });
        });
    };

    const handleMouseLeave = () => {
        letters.forEach((letter) => {
            gsap.to(letter, {
                duration: 0.5,
                ease: 'power2.out',
                fontVariationSettings: `'wght' ${defaultWeight}`
            });
        });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
    };
}

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        const cleanupTitle = setupTextHover(titleRef.current, 'title');
        const cleanupSubtitle = setupTextHover(subtitleRef.current, 'subtitle');

        return () => {
            cleanupTitle?.();
            cleanupSubtitle?.();
        };
    }, [])

    return (
        <section id="welcome">
            <p ref={subtitleRef}>
                <span className='text-3xl font-georama'>
                    yoo, i&apos;m{' '}
                    <span className='italic font-semibold text-white/90'>
                        shrvan
                    </span>
                    ! welcome to my
                </span>
            </p>
            <h1 ref={titleRef} className='mt-7'>
                {renderText('space', 'text-9xl italic font-georama', 400)}
            </h1>

            <div className='small-screen'>
                <p className='text-3xl font-georama'>
                    designed only for laptop/tablets
                </p>
            </div>
        </section>
    )
}

export default Welcome