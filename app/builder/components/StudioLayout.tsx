import React, {type ReactNode, useId} from "react";
import {MotionConfig, motion} from "motion/react";
import {RotateCcw} from "lucide-react";
import {Button} from "@/components/ui/button";
import {duration, ease} from "@/lib/motion";
import {cn} from "@/lib/utils";
import Artboard from "./Artboard";
import ExportButton from "./ExportButton";
import PreviewStatus from "./PreviewStatus";
import StartOverDialog from "./StartOverDialog";
import Wordmark from "./Wordmark";
import NameField from "./fields/NameField";
import CompanyField from "./fields/CompanyField";
import QuoteField from "./fields/QuoteField";
import PhotoField from "./fields/PhotoField";
import LayoutField from "./fields/LayoutField";
import BackdropField from "./fields/BackdropField";
import NameToneField from "./fields/NameToneField";
import CornerField from "./fields/CornerField";
import BorderField from "./fields/BorderField";
import ShadowField from "./fields/ShadowField";
import {groupTitleClass, ruledRowsClass} from "./fields/fieldStyles";

/** Desktop builder: every control visible at once, content on the left, design on the right, docked to a drafting grid. */
function StudioLayout() {
    return (
        <MotionConfig reducedMotion="user" transition={{duration: duration.fast, ease: ease.out}}>
            <div className="bg-drafting flex h-dvh flex-col overflow-x-clip">
                <header className="flex h-[52px] shrink-0 items-center justify-between gap-3 border-b border-rule bg-background px-4">
                    <Wordmark/>
                    <div className="flex items-center gap-2">
                        <StartOverDialog>
                            <Button variant="outline">
                                <RotateCcw/>
                                Start over
                            </Button>
                        </StartOverDialog>
                        <ExportButton/>
                    </div>
                </header>

                <div className="grid min-h-0 flex-1 grid-cols-[minmax(300px,340px)_1fr_minmax(300px,340px)]">
                    <Panel side="left" index={1} title="Content" description="What they said and who said it">
                        <PanelGroup title="Testimonial">
                            <NameField/>
                            <CompanyField/>
                            <QuoteField/>
                        </PanelGroup>
                        <PanelGroup title="Photo">
                            <PhotoField/>
                        </PanelGroup>
                    </Panel>

                    <main className="flex min-h-0 flex-col items-center justify-center gap-4 px-6 py-8">
                        <Artboard className="w-full flex-1 self-stretch"/>
                        <PreviewStatus/>
                    </main>

                    <Panel side="right" index={2} title="Design" description="Layout, background and finish">
                        <PanelGroup title="Composition">
                            <LayoutField/>
                            <BackdropField/>
                            <NameToneField/>
                        </PanelGroup>
                        <PanelGroup title="Finish">
                            <CornerField/>
                            <BorderField/>
                            <ShadowField/>
                        </PanelGroup>
                    </Panel>
                </div>
            </div>
        </MotionConfig>
    );
}

/** A docked rail: an ink edge toward the stage, a numbered header that stays put while the groups scroll. */
function Panel({side, index, title, description, children}: {
    side: "left" | "right";
    index: number;
    title: string;
    description: string;
    children: ReactNode;
}) {
    const headingId = `builder-${side}-panel-heading`;

    return (
        // Panels fade in place; a drafting tool doesn't slide its rails around.
        <motion.aside
            aria-labelledby={headingId}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            className={cn(
                "min-h-0 overflow-y-auto overscroll-contain bg-background",
                side === "left" ? "border-r border-rule" : "border-l border-rule"
            )}
        >
            <div className="sticky top-0 z-10 grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-0.5 border-b border-rule bg-background px-4 py-3.5">
                <span aria-hidden className="rounded-[3px] border border-rule px-[5px] font-mono text-[11px] leading-4 font-medium tracking-[0.02em]">
                    {String(index).padStart(2, "0")}
                </span>
                <h2 id={headingId} className="text-sm leading-5 font-semibold">{title}</h2>
                <p className="col-span-2 text-xs text-muted-foreground">{description}</p>
            </div>
            {children}
        </motion.aside>
    );
}

/** A titled cluster of fields, each on its own ruled row; groups are split by an ink rule. */
function PanelGroup({title, children}: { title: string; children: ReactNode }) {
    const headingId = useId();

    return (
        <div role="group" aria-labelledby={headingId} className="flex flex-col gap-3.5 border-b border-rule p-4 last:border-b-0">
            <h3 id={headingId} className={groupTitleClass}>{title}</h3>
            <div className={ruledRowsClass}>{children}</div>
        </div>
    );
}

export default StudioLayout;
