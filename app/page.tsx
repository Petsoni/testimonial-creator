import React from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Reveal from "@/app/components/landing/Reveal";
import SiteHeader from "@/app/components/landing/SiteHeader";
import SiteFooter from "@/app/components/landing/SiteFooter";
import UseCase from "@/app/components/landing/use-cases/UseCase";
import WebsiteMock from "@/app/components/landing/use-cases/WebsiteMock";
import SlideMock from "@/app/components/landing/use-cases/SlideMock";
import PostMock from "@/app/components/landing/use-cases/PostMock";
import {links} from "@/app/components/landing/links";

function Page() {
    return (
        <div className={"landing-root flex min-h-dvh flex-col"}>
            <SiteHeader/>

            <main className={"flex-1"}>
                <section className={"mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 pt-14 pb-14 text-center sm:px-6 lg:pt-20"}>
                    <div className={"flex flex-col items-center gap-3"}>
                        <Reveal>
                            <h1 className={"landing-text max-w-3xl text-balance"}>
                                Create Stunning Testimonials Instantly
                            </h1>
                        </Reveal>
                        <Reveal delay={0.06}>
                            <p className={"landing-lede max-w-[38ch] text-balance text-[var(--gray-600)]"}>
                                Create polished testimonial cards instantly and showcase what customers really think.
                            </p>
                        </Reveal>
                    </div>
                    <Reveal delay={0.12} className={"flex flex-wrap items-center justify-center gap-3"}>
                        <Button asChild size="lg">
                            <Link href={links.builder}>Create one now</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <a href={links.github} target="_blank" rel="noopener noreferrer">
                                View on GitHub<span className={"sr-only"}> (opens in a new tab)</span>
                            </a>
                        </Button>
                    </Reveal>
                </section>

                <section aria-labelledby="use-cases-heading" className={"mx-auto max-w-4xl px-4 sm:px-6"}>
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
                </section>

                <section className={"mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 pt-28 pb-20 text-center sm:px-6"}>
                    <Reveal inView>
                        <h2 className={"text-balance"}>Your customers already said it.</h2>
                    </Reveal>
                    <Reveal inView delay={0.06}>
                        <Button asChild size="lg">
                            <Link href={links.builder}>Create one now</Link>
                        </Button>
                    </Reveal>
                </section>
            </main>

            <SiteFooter/>
        </div>
    );
}

export default Page;
