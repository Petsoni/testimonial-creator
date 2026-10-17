import React from 'react';
import ExportFrame from "@/app/components/landing/ExportFrame";
import {exampleStudio, exampleTestimonials} from "@/app/components/landing/example-testimonials";

function WebsiteMock() {
    return (
        <div role="img"
             aria-label={`Two exported cards in the testimonials section of ${exampleStudio.name}'s website`}
             className={"overflow-hidden rounded-xl border border-[var(--gray-100)] bg-white shadow-sm"}>
            <div aria-hidden
                 className={"flex items-center gap-3 border-b border-[var(--gray-100)] bg-[var(--gray-50)] px-3 py-2.5 sm:px-4"}>
                <div className={"flex w-12 shrink-0 gap-1.5"}>
                    <div className={"size-2.5 rounded-full bg-[var(--gray-200)]"}/>
                    <div className={"size-2.5 rounded-full bg-[var(--gray-200)]"}/>
                    <div className={"size-2.5 rounded-full bg-[var(--gray-200)]"}/>
                </div>
                <div className={"mx-auto min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-xs text-[var(--gray-500)] sm:max-w-xs"}>
                    {exampleStudio.domain}/clients
                </div>
                <div className={"w-12 shrink-0"}/>
            </div>
            <div aria-hidden className={"px-5 py-6 sm:px-10 sm:py-10"}>
                <div className={"flex items-center justify-between text-sm"}>
                    <div className={"text-[var(--gray-950)]"}>{exampleStudio.name}</div>
                    <div className={"flex gap-4 text-[var(--gray-500)] sm:gap-6"}>
                        <div>Work</div>
                        <div className={"text-[var(--gray-950)]"}>Clients</div>
                        <div className={"hidden sm:block"}>Contact</div>
                    </div>
                </div>
                <div className={"mt-10 text-xs tracking-wide text-[var(--gray-500)] uppercase"}>Clients</div>
                <div className={"mt-2 max-w-md text-xl leading-snug text-[var(--gray-950)] sm:text-2xl"}>
                    Kind words from the people we build with
                </div>
                <div className={"mt-6 grid gap-4 sm:grid-cols-2"}>
                    <ExportFrame example={exampleTestimonials.ingrid} className={"rounded-lg"}/>
                    <ExportFrame example={exampleTestimonials.daniel} className={"rounded-lg"}/>
                </div>
            </div>
        </div>
    );
}

export default WebsiteMock;
