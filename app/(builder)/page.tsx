"use client";

import DesktopLayout from "@/app/(builder)/components/DesktopLayout";
import MobileLayout from "@/app/(builder)/components/MobileLayout";

export default function Home() {

    return (
        <main>
            <div className={"block lg:hidden"}>
                <MobileLayout/>
            </div>
            <div className={"hidden lg:block"}>
                <DesktopLayout/>
            </div>
        </main>
    );
}
