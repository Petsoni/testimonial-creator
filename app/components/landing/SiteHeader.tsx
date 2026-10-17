import React from 'react';
import Link from "next/link";
import {IconBrandGithub} from "@tabler/icons-react";
import {Button} from "@/components/ui/button";
import Wordmark from "@/app/builder/components/Wordmark";
import {links} from "@/app/components/landing/links";

function SiteHeader() {
    return (
        <header className={"relative z-20"}>
            <div className={"mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6"}>
                <Wordmark/>
                <nav aria-label="Main" className={"flex items-center gap-1"}>
                    <Button asChild variant="ghost" size="sm">
                        <a href={links.github} target="_blank" rel="noopener noreferrer">
                            <IconBrandGithub aria-hidden/>
                            <span className={"sr-only sm:not-sr-only"}>GitHub</span>
                            <span className={"sr-only"}> (opens in a new tab)</span>
                        </a>
                    </Button>
                    <Button asChild size="sm">
                        <Link href={links.builder}>Open builder</Link>
                    </Button>
                </nav>
            </div>
        </header>
    );
}

export default SiteHeader;
