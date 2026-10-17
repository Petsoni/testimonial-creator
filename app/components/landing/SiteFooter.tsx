import React from 'react';
import {links} from "@/app/components/landing/links";

function SiteFooter() {
    return (
        <footer className={"relative z-20 border-t border-rule bg-background"}>
            <div className={"mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-1 px-4 py-6 text-center text-sm text-ink-2 sm:flex-row sm:px-6 sm:text-left"}>
                <p>
                    Built with love by{" "}
                    <a className={"rounded-sm text-foreground underline decoration-muted-line underline-offset-4 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"} href={links.author}
                       target="_blank" rel="noopener noreferrer">
                        Petsoni
                    </a>
                </p>
                <p>
                    Open source, MIT licensed ·{" "}
                    <a className={"rounded-sm text-foreground underline decoration-muted-line underline-offset-4 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"}
                       href={links.github} target="_blank" rel="noopener noreferrer">
                        Source on GitHub
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default SiteFooter;
