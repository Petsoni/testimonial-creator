"use client";

import React from "react";
import Link from "next/link";
import {MotionConfig, motion} from "motion/react";
import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import Wordmark from "@/app/builder/components/Wordmark";
import {DecoLeft, DecoRight, ExportTile} from "@/components/landing/HeroDeco";
import {duration, ease} from "@/lib/motion";
import {ARTBOARD_SIZE, EXPORT_SCALE} from "@/lib/screenshot-service";

const EXPORT_SIZE = ARTBOARD_SIZE * EXPORT_SCALE;

// The copy arrives top to bottom, each line rising 8px as it fades in.
const rise = {initial: {opacity: 0, y: 8}, animate: {opacity: 1, y: 0}};

function Page() {
    return (
        <MotionConfig reducedMotion="user" transition={{duration: duration.slow, ease: ease.out}}>
            <div className="bg-drafting relative flex min-h-dvh flex-col overflow-x-clip">
                <header className="relative z-20 flex h-[52px] shrink-0 items-center justify-between gap-3 border-b border-rule bg-background px-4 sm:px-6">
                    <Wordmark/>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/builder">Open builder</Link>
                    </Button>
                </header>

                <main className="relative flex flex-1 flex-col items-center justify-center px-4 py-16 sm:px-6">
                    {/* Layout guides at the copy column's edges, like a frame on a canvas. */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[680px] -translate-x-1/2 border-x border-dashed border-muted-line md:block"
                    />

                    <DecoLeft/>
                    <DecoRight/>

                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={{animate: {transition: {staggerChildren: 0.06}}}}
                        className="relative z-10 flex max-w-[620px] flex-col items-center text-center"
                    >
                        {/* Clean paper behind the copy, so the grid never runs under the text. */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -inset-x-20 -inset-y-14 -z-10"
                            style={{background: "radial-gradient(closest-side, var(--canvas) 62%, transparent)"}}
                        />
                        <motion.span
                            variants={rise}
                            className="inline-flex items-center gap-2 rounded-sm border border-rule bg-background px-2 py-1 font-mono text-[11px] leading-4 font-medium tracking-[0.08em] uppercase"
                        >
                            <span aria-hidden className="size-1.5 rounded-full bg-ring"/>
                            Open source testimonial builder
                        </motion.span>
                        <motion.h1
                            variants={rise}
                            className="mt-6 text-[clamp(2.5rem,4vw+1rem,4rem)] leading-[1.04] font-semibold tracking-[-0.045em] text-balance"
                        >
                            Create stunning testimonials instantly
                        </motion.h1>
                        <motion.p
                            variants={rise}
                            className="mt-5 max-w-[46ch] text-base leading-relaxed text-pretty text-ink-2 sm:text-lg"
                        >
                            Turn what customers said into polished cards for your site and socials. Pick a layout,
                            tune the finish, export a PNG.
                        </motion.p>
                        <motion.div variants={rise} className="mt-8">
                            <Button asChild size="lg">
                                <Link href="/builder">
                                    Create one now
                                    <ArrowRight/>
                                </Link>
                            </Button>
                        </motion.div>
                        <motion.p
                            variants={rise}
                            className="mt-4 font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase tabular-nums"
                        >
                            No sign-up · {EXPORT_SIZE} × {EXPORT_SIZE} PNG
                        </motion.p>
                    </motion.div>

                    {/* Below 1280px the side pieces don't fit, so the finished card sits under the call to action. */}
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.35}}
                        className="relative z-10 mt-14 mb-6 w-full max-w-[280px] xl:hidden"
                    >
                        <ExportTile caption={false}/>
                    </motion.div>
                </main>
            </div>
        </MotionConfig>
    );
}

export default Page;
