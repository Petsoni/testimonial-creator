import React from 'react';
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import Reveal from "@/app/components/landing/Reveal";
import SiteHeader from "@/app/components/landing/SiteHeader";
import SiteFooter from "@/app/components/landing/SiteFooter";
import {DecoLeft, DecoRight} from "@/app/components/landing/HeroDeco";
import UseCase from "@/app/components/landing/use-cases/UseCase";
import WebsiteMock from "@/app/components/landing/use-cases/WebsiteMock";
import SlideMock from "@/app/components/landing/use-cases/SlideMock";
import PostMock from "@/app/components/landing/use-cases/PostMock";
import {links} from "@/app/components/landing/links";

// ARTBOARD_SIZE × EXPORT_SCALE in lib/screenshot-service, kept local so the landing page doesn't load html2canvas.
const EXPORT_SIZE = 1536;

function Page() {
    return (
        <div className={"bg-drafting flex min-h-dvh flex-col"}>
            <SiteHeader/>

            <main className={"flex-1"}>
                <section className={"relative overflow-x-clip"}>
                    {/* Layout guides at the copy column's edges, like a frame on a canvas. */}
                    <div
                        aria-hidden
                        className={"pointer-events-none absolute inset-y-0 left-1/2 hidden w-[680px] -translate-x-1/2 border-x border-dashed border-muted-line md:block"}
                    />

                    <DecoLeft/>
                    <DecoRight/>

                    <div className={"relative z-10 mx-auto flex max-w-[668px] flex-col items-center px-4 pt-16 pb-20 text-center sm:px-6 lg:pt-24 lg:pb-28 xl:min-h-[680px] xl:justify-center xl:py-16"}>
                        {/* Clean paper behind the copy, so the grid never runs under the text. */}
                        <div
                            aria-hidden
                            className={"pointer-events-none absolute inset-x-0 inset-y-8 -z-10"}
                            style={{background: "radial-gradient(closest-side, var(--canvas) 62%, transparent)"}}
                        />
                        <Reveal>
                            <span className={"inline-flex items-center gap-2 rounded-sm border border-rule bg-background px-2 py-1 font-mono text-[11px] leading-4 font-medium tracking-[0.08em] uppercase"}>
                                <span aria-hidden className={"size-1.5 rounded-full bg-ring"}/>
                                Open source testimonial builder
                            </span>
                        </Reveal>
                        <Reveal delay={0.06}>
                            <h1 className={"mt-6 text-[clamp(2.5rem,4vw+1rem,4rem)] leading-[1.04] font-semibold tracking-[-0.045em] text-balance"}>
                                Create stunning testimonials instantly
                            </h1>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <p className={"mt-5 max-w-[44ch] text-base leading-relaxed text-pretty text-ink-2 sm:text-lg"}>
                                Create polished testimonial cards instantly and showcase what customers really think.
                            </p>
                        </Reveal>
                        <Reveal delay={0.18} className={"mt-8 flex flex-wrap items-center justify-center gap-3"}>
                            <Button asChild size="lg">
                                <Link href={links.builder}>
                                    Create one now
                                    <ArrowRight/>
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <a href={links.github} target="_blank" rel="noopener noreferrer">
                                    View on GitHub<span className={"sr-only"}> (opens in a new tab)</span>
                                </a>
                            </Button>
                        </Reveal>
                        <Reveal delay={0.24}>
                            <p className={"mt-4 font-mono text-[11px] tracking-[0.06em] text-muted-foreground uppercase tabular-nums"}>
                                No sign-up · {EXPORT_SIZE} × {EXPORT_SIZE} PNG
                            </p>
                        </Reveal>
                    </div>
                </section>

                <section aria-labelledby="use-cases-heading" className={"border-t border-rule bg-background/60"}>
                    <div className={"mx-auto max-w-4xl px-4 py-20 sm:px-6 md:py-28"}>
                        <h2 id="use-cases-heading" className={"sr-only"}>Where your cards end up</h2>
                        <ul className={"flex flex-col gap-20 md:gap-28"}>
                            <UseCase title="On your website" description="Drop the PNGs into a clients page or next to your pricing.">
                                <WebsiteMock/>
                            </UseCase>
                            <UseCase title="In your deck" description="Back up a case study with the client's own words.">
                                <SlideMock/>
                            </UseCase>
                            <UseCase title="In your feed" description="The square format posts as-is, no cropping.">
                                <PostMock/>
                            </UseCase>
                        </ul>
                    </div>
                </section>

                <section className={"border-t border-rule"}>
                    <div className={"mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6"}>
                        <Reveal inView>
                            <h2 className={"text-[clamp(1.75rem,3vw+1rem,2.5rem)] leading-tight font-semibold tracking-[-0.035em] text-balance"}>
                                Your customers already said it.
                            </h2>
                        </Reveal>
                        <Reveal inView delay={0.06}>
                            <Button asChild size="lg">
                                <Link href={links.builder}>
                                    Create one now
                                    <ArrowRight/>
                                </Link>
                            </Button>
                        </Reveal>
                    </div>
                </section>
            </main>

            <SiteFooter/>
        </div>
    );
}

export default Page;
