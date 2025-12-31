import { Container } from 'lucide-react'
import React, { useRef } from 'react'

const FONT_WEIGHTS = {
    subttitle: { min: 100, max: 400, default: 100 },
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
}

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    return (
        <section id="welcome">
            <p ref={subtitleRef}>
                {renderText('yoo, i\'m shrvan! welcome to my', 'text-3xl font-georama', 100)}
            </p>
            <h1 ref={titleRef} className='mt-7'>
                {renderText('space', 'text-9xl italic font-georama')}
            </h1>

            <div className='small-screen'>
                <p>
                    designed only for laptop/tablets
                </p>
            </div>
        </section>
    )
}

export default Welcome