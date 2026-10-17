import React, {type ComponentProps, useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "motion/react";
import {Check, CircleAlert, Download, LoaderCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {backdropGradient} from "@/lib/backdrops";
import {duration, ease} from "@/lib/motion";
import {captureScreenshot} from "@/lib/screenshot-service";
import {cn} from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const LABELS: Record<Status, string> = {
    idle: "Export PNG",
    loading: "Exporting…",
    success: "Saved",
    error: "Try again",
};

// Short set for tight spots like the dock header, where every label must fit at 320px.
const COMPACT_LABELS: Record<Status, string> = {
    idle: "Export",
    loading: "Saving",
    success: "Saved",
    error: "Retry",
};

const ICONS: Record<Status, typeof Download> = {
    idle: Download,
    loading: LoaderCircle,
    success: Check,
    error: CircleAlert,
};

const ANNOUNCEMENTS: Record<Status, string> = {
    idle: "",
    loading: "Exporting your card",
    success: "Card saved as PNG",
    error: "Export failed. Try again.",
};

/** Export needs at least a name and a quote; anything less exports an empty-looking card. */
export function useCanExport() {
    const {username, testimonialText} = useTestimonialContent();
    return username.trim() !== "" && testimonialText.trim() !== "";
}

function ExportButton({
                          className,
                          compact = false,
                          ...props
                      }: Omit<ComponentProps<typeof Button>, "onClick" | "children"> & { compact?: boolean }) {
    const {username, userFirm, backdrop} = useTestimonialContent();
    const canExport = useCanExport();
    const [status, setStatus] = useState<Status>("idle");
    const resetTimer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(resetTimer.current), []);

    const runExport = async () => {
        if (status === "loading") return;
        window.clearTimeout(resetTimer.current);
        setStatus("loading");
        try {
            // Hold the spinner briefly so a fast export reads as work done, not a flicker.
            await Promise.all([
                captureScreenshot({background: backdropGradient(backdrop), username, userFirm}),
                new Promise((resolve) => setTimeout(resolve, 450)),
            ]);
            setStatus("success");
            resetTimer.current = window.setTimeout(() => setStatus("idle"), 2200);
        } catch {
            setStatus("error");
        }
    };

    const labels = compact ? COMPACT_LABELS : LABELS;
    const Icon = ICONS[status];

    return (
        <>
            <Button
                type="button"
                onClick={runExport}
                disabled={!canExport}
                aria-busy={status === "loading" || undefined}
                className={cn("relative overflow-hidden", status === "error" && "bg-destructive hover:bg-destructive/90", className)}
                {...props}
            >
                {/* Every label is laid out invisibly so the button never changes width. */}
                <span className="grid">
                    {(Object.keys(labels) as Status[]).map((key) => {
                        const GhostIcon = ICONS[key];
                        return (
                            <span key={key} aria-hidden className="invisible col-start-1 row-start-1 flex items-center justify-center gap-2 text-sm!">
                                <GhostIcon/>{labels[key]}
                            </span>
                        );
                    })}
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                            key={status}
                            initial={{opacity: 0, y: 8}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -8}}
                            transition={{duration: duration.fast, ease: ease.out}}
                            className="col-start-1 row-start-1 flex items-center justify-center gap-2 text-sm!"
                        >
                            <Icon className={cn(status === "loading" && "motion-safe:animate-spin")} aria-hidden/>
                            {labels[status]}
                        </motion.span>
                    </AnimatePresence>
                </span>
            </Button>
            <span role="status" className="sr-only">{ANNOUNCEMENTS[status]}</span>
        </>
    );
}

export default ExportButton;
