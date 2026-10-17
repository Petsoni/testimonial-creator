import React from "react";
import Link from "next/link";
import {Quote} from "lucide-react";
import {cn} from "@/lib/utils";

/** Logo link home. `collapse` keeps the name for screen readers but shows only the mark below 640px. */
function Wordmark({collapse = false}: { collapse?: boolean }) {
    return (
        <Link
            href="/"
            className="flex items-center gap-2 rounded-md outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
            <span aria-hidden className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Quote className="size-3.5" fill="currentColor" strokeWidth={0}/>
            </span>
            <span className={cn("text-sm font-semibold text-foreground", collapse && "max-sm:sr-only")}>EasyTestimonial</span>
        </Link>
    );
}

export default Wordmark;
