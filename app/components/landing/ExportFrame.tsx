"use client";

import React, {useLayoutEffect, useMemo, useRef, useState} from 'react';
import TestimonialCard from "@/app/builder/components/TestimonialCard";
import {TestimonialContentContext, TestimonialContentContextType} from "@/context/TestimonialContentContext";
import {backdropGradient, borderTint, cardTint, findBackdrop, nameColor} from "@/lib/backdrops";
import {cn} from "@/lib/utils";
import type {ExampleTestimonial} from "@/app/components/landing/example-testimonials";

// ARTBOARD_SIZE in lib/screenshot-service, kept local so the landing page doesn't load html2canvas.
const ARTBOARD_SIZE = 768;

const noop = () => {};

/** A read-only context for one example card, derived the same way TestimonialContentProvider derives it. */
function exampleContext(example: ExampleTestimonial): TestimonialContentContextType {
    const {backdropId, ...content} = example;
    const backdrop = findBackdrop(backdropId);
    return {
        ...content,
        userFirmLink: "",
        backdrop,
        cardColor: cardTint(backdrop),
        cardBorderColor: content.cardBorderWidth > 0 ? borderTint(backdrop) : "transparent",
        usernameColor: nameColor(backdrop, content.nameTone),
        cardKey: 0,
        setUsername: noop,
        setUserFirm: noop,
        setUserFirmLink: noop,
        setTestimonialText: noop,
        setSeparator: noop,
        setProfilePicturePreview: noop,
        setImageBorderRadius: noop,
        setDisplayType: noop,
        setBackdrop: noop,
        setNameTone: noop,
        setCardBorderRadius: noop,
        setCardShadow: noop,
        setCardBorderWidth: noop,
        resetCard: noop,
    };
}

/**
 * The exported PNG, scaled to whatever width it's given: the builder's artboard size, backdrop
 * gradient and TestimonialCard, so what the landing page shows is what the builder downloads.
 */
function ExportFrame({example, className}: { example: ExampleTestimonial; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0);
    const content = useMemo(() => exampleContext(example), [example]);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / ARTBOARD_SIZE));
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={cn("relative aspect-square w-full overflow-hidden text-left", className)}>
            <div
                className={"capture-screenshot origin-top-left"}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    background: backdropGradient(content.backdrop),
                    transform: `scale(${scale})`,
                    // Hidden until the first measurement so it never flashes at full size.
                    visibility: scale ? undefined : "hidden",
                }}
            >
                <div className={"grid place-items-center"}>
                    <TestimonialContentContext.Provider value={content}>
                        <TestimonialCard/>
                    </TestimonialContentContext.Provider>
                </div>
            </div>
        </div>
    );
}

export default ExportFrame;
