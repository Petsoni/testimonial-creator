"use client";

import React, {type ReactNode} from "react";
import {motion} from "motion/react";
import ExportFrame from "@/app/components/landing/ExportFrame";
import {exampleTestimonials} from "@/app/components/landing/example-testimonials";
import {BACKDROPS, backdropGradient, cardTint, findBackdrop} from "@/lib/backdrops";
import {duration, ease} from "@/lib/motion";
import {cn} from "@/lib/utils";

/*
 * Decoration for the landing hero, after Relume's: pieces of the product float at the edges.
 * The left side writes a testimonial, the right styles and exports one. The cards are real
 * exports (ExportFrame), the same as the use cases further down. All of it is aria-hidden; the
 * hero copy already says what the product does.
 */

// ARTBOARD_SIZE × EXPORT_SCALE in lib/screenshot-service, kept local so the landing page doesn't load html2canvas.
const EXPORT_SIZE = 1536;

const writing = exampleTestimonials.leo;
const exporting = exampleTestimonials.daniel;

// What the Write panel shows mid-typing: the first sentence of the quote.
const TYPED = writing.testimonialText.slice(0, writing.testimonialText.indexOf(".") + 1);

const enter = (delay: number, x: number) => ({
    initial: {opacity: 0, x},
    animate: {opacity: 1, x: 0},
    transition: {delay, duration: duration.slow, ease: ease.out},
});

/** Step label, in the same numbered chip the builder's panels use. */
function Caption({step, children}: { step: string; children: ReactNode }) {
    return (
        <div className="mb-2 flex items-center gap-2 font-mono text-[11px] leading-4 font-medium tracking-[0.08em] uppercase">
            <span className="rounded-[3px] border border-rule bg-background px-[5px] tracking-[0.02em]">{step}</span>
            <span className="text-ink-2">{children}</span>
        </div>
    );
}

/** The builder's content fields, caught mid-sentence. */
function WritePanel() {
    return (
        <div className="w-[260px] border border-rule bg-background">
            <div className="border-b border-rule-soft p-3">
                <div className="mb-1.5 font-mono text-[10px] leading-none tracking-[0.05em] text-ink-2 uppercase">Name</div>
                <div className="flex h-7 items-center rounded-sm border border-rule px-2 text-xs">{writing.username}</div>
            </div>
            <div className="p-3">
                <div className="mb-1.5 flex justify-between font-mono text-[10px] leading-none tracking-[0.05em] uppercase">
                    <span className="text-ink-2">Quote</span>
                    <span className="text-muted-foreground tabular-nums">{TYPED.length} / 500</span>
                </div>
                <div className="rounded-sm border border-rule px-2 py-1.5 text-xs leading-relaxed outline-2 outline-offset-2 outline-ring">
                    {TYPED}
                    <span className="ml-px inline-block h-3.5 w-px translate-y-0.5 bg-foreground motion-safe:animate-caret-blink"/>
                </div>
            </div>
        </div>
    );
}

/** A collaborator-style cursor, labelled with what it's doing rather than who it is. */
function Cursor({label, className, delay}: { label: string; className?: string; delay: number }) {
    return (
        <motion.span
            className={cn("pointer-events-none absolute z-10 flex items-start", className)}
            initial={{opacity: 0, x: 40, y: 32}}
            animate={{opacity: 1, x: 0, y: 0}}
            transition={{delay, duration: 0.6, ease: ease.out}}
        >
            <svg width="16" height="18" viewBox="0 0 16 18" className="drop-shadow-sm">
                <path d="M1 1v14l4-4 3 6 2.5-1-3-6H13z" fill="#111" stroke="#fff" strokeWidth="1.25" strokeLinejoin="round"/>
            </svg>
            <span className="mt-3.5 -ml-0.5 rounded-sm bg-ring px-1.5 py-1 font-mono text-[10px] leading-none font-medium text-white">
                {label}
            </span>
        </motion.span>
    );
}

/** The Background picker with the exported card's backdrop chosen and a cursor resting on it. */
function StylePanel() {
    const chosen = findBackdrop(exporting.backdropId);

    return (
        <div className="w-[236px] border border-rule bg-background p-3">
            <div className="mb-2 flex items-baseline justify-between font-mono text-[10px] leading-none tracking-[0.05em]">
                <span className="text-ink-2 uppercase">Background</span>
                <span className="text-muted-foreground">{chosen.name}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
                {BACKDROPS.map((backdrop) => (
                    <span
                        key={backdrop.id}
                        className="relative flex aspect-square items-center justify-center rounded-sm shadow-[inset_0_0_0_1px_var(--rule)]"
                        style={{background: backdropGradient(backdrop)}}
                    >
                        <span className="h-[30%] w-[62%] rounded-[1px] shadow-[0_0_0_1px_rgb(17_17_17/0.4)]" style={{background: cardTint(backdrop)}}/>
                        {backdrop.id === chosen.id && (
                            <>
                                <span className="absolute -inset-[3px] rounded-[5px] ring-2 ring-primary"/>
                                <Cursor label={chosen.name} delay={0.9} className="top-[55%] left-[55%]"/>
                            </>
                        )}
                    </span>
                ))}
            </div>
        </div>
    );
}

const HANDLES = ["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"];

/** The finished card, selected on the canvas: violet frame, square handles, the export size underneath. */
function ExportTile() {
    return (
        <div className="w-full">
            <Caption step="03">Export</Caption>
            <div className="relative">
                <ExportFrame example={exporting} className="ring-1 ring-rule"/>
                <span className="pointer-events-none absolute -inset-1.5 border border-ring">
                    {HANDLES.map((position) => (
                        <span key={position} className={cn("absolute size-[7px] border border-ring bg-background", position)}/>
                    ))}
                </span>
                <span className="absolute top-full left-1/2 mt-3 -translate-x-1/2 rounded-sm bg-ring px-1.5 py-1 font-mono text-[10px] leading-none font-medium whitespace-nowrap text-white tabular-nums">
                    {EXPORT_SIZE} × {EXPORT_SIZE} PNG
                </span>
            </div>
        </div>
    );
}

/** Left edge, from 1280px: writing the testimonial, with the card it becomes tucked underneath. */
export function DecoLeft() {
    return (
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-[max(16px,calc(50%-660px))] hidden w-[300px] translate-y-[calc(-50%+24px)] xl:block">
            <motion.div {...enter(0.3, -16)}>
                <Caption step="01">Write</Caption>
                <WritePanel/>
                <div className="relative -mt-5 ml-16 w-[210px]">
                    <ExportFrame example={writing} className="ring-1 ring-rule"/>
                </div>
            </motion.div>
        </div>
    );
}

/** Right edge, from 1280px: picking a background, then the selected card ready to export. */
export function DecoRight() {
    return (
        <div aria-hidden className="pointer-events-none absolute top-1/2 right-[max(16px,calc(50%-660px))] hidden w-[300px] translate-y-[calc(-50%-16px)] xl:block">
            <motion.div {...enter(0.4, 16)} className="flex flex-col items-end">
                <div>
                    <Caption step="02">Style</Caption>
                    <StylePanel/>
                </div>
                <div className="mt-10 mr-14 w-[226px]">
                    <ExportTile/>
                </div>
            </motion.div>
        </div>
    );
}
