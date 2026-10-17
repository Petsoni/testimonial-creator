import React, {type ReactNode} from "react";
import {MotionConfig, motion} from "motion/react";
import {RotateCcw} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {duration, ease, fadeUp, stagger} from "@/lib/motion";
import {cn} from "@/lib/utils";
import Artboard from "./Artboard";
import ExportButton from "./ExportButton";
import PreviewStatus from "./PreviewStatus";
import Wordmark from "./Wordmark";
import NameField from "./fields/NameField";
import CompanyField from "./fields/CompanyField";
import SeparatorField from "./fields/SeparatorField";
import QuoteField from "./fields/QuoteField";
import PhotoField from "./fields/PhotoField";
import LayoutField from "./fields/LayoutField";
import BackdropField from "./fields/BackdropField";
import NameToneField from "./fields/NameToneField";
import CornerField from "./fields/CornerField";
import BorderField from "./fields/BorderField";
import ShadowField from "./fields/ShadowField";

/** Desktop builder: every control visible at once, content on the left, design on the right. */
function StudioLayout() {
    const {resetCard} = useTestimonialContent();

    return (
        <MotionConfig reducedMotion="user" transition={{duration: duration.base, ease: ease.out}}>
            <div className="flex h-dvh flex-col overflow-x-clip bg-muted/40">
                <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b bg-background/90 px-5 backdrop-blur-md">
                    <Wordmark/>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={resetCard} className="text-sm!">
                            <RotateCcw/>
                            <span className="text-sm!">Start over</span>
                        </Button>
                        <ExportButton size="sm"/>
                    </div>
                </header>

                <div className="grid min-h-0 flex-1 grid-cols-[minmax(300px,340px)_1fr_minmax(300px,340px)]">
                    <Panel side="left" title="Content" description="What they said and who said it">
                        <NameField/>
                        <CompanyField/>
                        <SeparatorField/>
                        <QuoteField/>
                        <PhotoField/>
                    </Panel>

                    <main className="flex min-h-0 flex-col items-center justify-center gap-3 p-10">
                        <Artboard className="w-full flex-1 self-stretch"/>
                        <PreviewStatus/>
                    </main>

                    <Panel side="right" title="Design" description="Layout, background and finish">
                        <LayoutField/>
                        <BackdropField/>
                        <NameToneField/>
                        <Separator/>
                        <CornerField/>
                        <BorderField/>
                        <ShadowField/>
                    </Panel>
                </div>
            </div>
        </MotionConfig>
    );
}

function Panel({side, title, description, children}: {
    side: "left" | "right";
    title: string;
    description: string;
    children: ReactNode;
}) {
    const headingId = `builder-${side}-panel-heading`;

    return (
        <motion.aside
            aria-labelledby={headingId}
            initial={{opacity: 0, x: side === "left" ? -12 : 12}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: duration.slow, ease: ease.out}}
            className={cn("min-h-0 overflow-y-auto bg-background", side === "left" ? "border-r" : "border-l")}
        >
            <div className="sticky top-0 z-10 border-b bg-background/95 px-5 py-4 backdrop-blur-md">
                <h2 id={headingId} className="text-sm! leading-tight font-semibold! text-foreground">{title}</h2>
                <small className="text-xs text-muted-foreground">{description}</small>
            </div>
            {/* Fields fade up one after another so the panel reads top to bottom on arrival. */}
            <motion.div
                initial="initial"
                animate="animate"
                variants={stagger(0.035, 0.08)}
                className="flex flex-col gap-6 p-5"
            >
                {React.Children.map(children, (child) => (
                    <motion.div variants={fadeUp}>{child}</motion.div>
                ))}
            </motion.div>
        </motion.aside>
    );
}

export default StudioLayout;
