"use client";

import React, {useLayoutEffect, useRef, useState} from 'react';
import CardStyle1 from "@/app/builder/components/card-styles/CardStyle1";
import CardStyle2 from "@/app/builder/components/card-styles/CardStyle2";
import {DisplayTypeEnum} from "@/lib/models/display-type.enum";
import {cardCanvasBackground, cn} from "@/lib/utils";
import type {ExampleTestimonial} from "@/app/components/landing/example-testimonials";

// Width of .capture-screenshot in globals.css, the frame captureScreenshot() turns into the PNG.
const EXPORT_FRAME_SIZE = 768;

/**
 * The exported PNG, scaled to whatever width it's given. It reuses .capture-screenshot, the export
 * gradient and the builder's card components, so what the landing page shows is what the builder downloads.
 */
function ExportFrame({card, className}: { card: ExampleTestimonial; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0);
    const Card = card.displayType === DisplayTypeEnum.STYLE2 ? CardStyle2 : CardStyle1;

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / EXPORT_FRAME_SIZE));
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
                    background: cardCanvasBackground(card.cardColor),
                    transform: `scale(${scale})`,
                    // Hidden until the first measurement so it never flashes at full size.
                    visibility: scale ? undefined : "hidden",
                }}
            >
                <div>
                    <Card cardProps={card}/>
                </div>
            </div>
        </div>
    );
}

export default ExportFrame;
