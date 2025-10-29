"use client";

import LeftSidebar from "@/app/(builder)/components/LeftSidebar";
import RightSidebar from "@/app/(builder)/components/RightSidebar";
import TestimonialCard from "@/app/(builder)/components/TestimonialCard";

export default function Home() {

    return (
        <main className={"flex flex-row w-full h-screen"}>
            <LeftSidebar/>
            <section className={"w-full flex items-center justify-center"}>
                <TestimonialCard/>
            </section>
            <RightSidebar/>
        </main>
    );
}
