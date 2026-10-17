import React from 'react';
import ExportFrame from "@/app/components/landing/ExportFrame";
import {exampleStudio, exampleTestimonials} from "@/app/components/landing/example-testimonials";

function SlideMock() {
    return (
        <div role="img"
             aria-label={`An exported card on a case-study slide in ${exampleStudio.name}'s pitch deck`}
             className={"rounded-xl bg-[var(--gray-100)] p-3 shadow-sm sm:p-5"}>
            {/* Everything inside is sized in cqw, so the slide keeps its proportions at any width. */}
            <div aria-hidden
                 className={"@container grid aspect-video grid-cols-[minmax(0,1fr)_auto] items-center gap-[4%] overflow-hidden rounded-md bg-white p-[5%] shadow-md"}>
                <div className={"flex flex-col gap-[0.6em] text-[1.6cqw] text-[var(--gray-500)]"}>
                    <div>{exampleStudio.name} · Case study</div>
                    <div className={"text-[4cqw] leading-[1.15] text-[var(--gray-950)]"}>Northwind onboarding rebuild</div>
                    <div className={"mt-[1em] flex flex-col gap-[0.4em] text-[1.9cqw] text-[var(--gray-800)] tabular-nums"}>
                        <div>Activation 31% → 48%</div>
                        <div>Support tickets down 50%</div>
                        <div>Shipped in 2 weeks</div>
                    </div>
                </div>
                {/* The slide's content box is 56.25% − 10% padding of its width tall, so a 46cqw square fills it. */}
                <ExportFrame card={exampleTestimonials.maya} className={"w-[46cqw] rounded-sm shadow-sm"}/>
            </div>
        </div>
    );
}

export default SlideMock;
