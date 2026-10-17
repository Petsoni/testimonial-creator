import React, {type ComponentType, type ReactNode, useState} from "react";
import {MotionConfig, motion} from "motion/react";
import {Eraser, ImageIcon, Palette, SquareRoundCorner, Type, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Popover, PopoverClose, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
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
import {ruledRowsClass} from "./fields/fieldStyles";

type ToolId = "text" | "photo" | "style" | "shape";

const TOOLS: {
    id: ToolId;
    label: string;
    title: string;
    icon: ComponentType<{ className?: string }>;
    body: () => ReactNode;
}[] = [
    {
        id: "text",
        label: "Text",
        title: "Quote and attribution",
        icon: Type,
        body: () => (
            <>
                <NameField/>
                <CompanyField/>
                <QuoteField className="max-h-44"/>
            </>
        ),
    },
    {id: "photo", label: "Photo", title: "Photo", icon: ImageIcon, body: () => <PhotoField/>},
    {
        id: "style",
        label: "Style",
        title: "Layout and background",
        icon: Palette,
        body: () => (
            <>
                <LayoutField/>
                <BackdropField/>
                <NameToneField/>
            </>
        ),
    },
    {
        id: "shape",
        label: "Shape",
        title: "Corners, border and shadow",
        icon: SquareRoundCorner,
        body: () => (
            <>
                <CornerField/>
                <BorderField/>
                <ShadowField/>
            </>
        ),
    },
];

const FIRST_FIELD = "input:not([type=file]):not(:disabled), textarea, [role=radio], button:not(:disabled)";

/** Phone and tablet builder: the card owns the screen; controls open on demand from a dock. */
function DockLayout() {
    const [open, setOpen] = useState<ToolId | null>(null);
    // While a tool is open the card moves to the top so the popover never covers it.
    const editing = open !== null;

    return (
        <MotionConfig reducedMotion="user" transition={{duration: duration.base, ease: ease.out}}>
            <div className="bg-drafting relative flex h-dvh min-h-[480px] flex-col overflow-hidden">
                <header className="relative z-20 flex h-[52px] shrink-0 items-center justify-between gap-3 border-b border-rule bg-background px-4 sm:px-6">
                    <Wordmark collapse/>
                    <div className="flex items-center gap-2">
                        <StartOverDialog>
                            <Button variant="outline" size="sm" aria-label="Clear card">
                                <Eraser/>
                                <span className="hidden sm:inline">Clear</span>
                            </Button>
                        </StartOverDialog>
                        <ExportButton size="sm" compact/>
                    </div>
                </header>

                <main
                    className={cn(
                        "flex min-h-0 flex-1 flex-col items-center px-4 pt-4 pb-28 sm:px-8",
                        editing ? "justify-start" : "justify-center"
                    )}
                >
                    <motion.div
                        layout="position"
                        transition={{duration: duration.slow, ease: ease.out}}
                        className={cn("flex w-full flex-col items-center gap-2", editing ? "flex-none" : "min-h-0 flex-1")}
                    >
                        <Artboard className={cn("w-full", editing ? "aspect-square max-h-[42dvh]" : "min-h-0 flex-1 self-stretch")}/>
                        <PreviewStatus/>
                    </motion.div>
                </main>

                <motion.nav
                    aria-label="Editing tools"
                    initial={{opacity: 0, y: 16}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: duration.slow, ease: ease.out, delay: 0.12}}
                    className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex justify-center px-3"
                >
                    <div className="pointer-events-auto flex items-center gap-1 rounded-md border border-rule bg-background p-1 shadow-[0_10px_24px_-14px_rgb(17_17_17/0.35)]">
                        {TOOLS.map((tool) => {
                            const isOpen = open === tool.id;
                            return (
                                <Popover
                                    key={tool.id}
                                    open={isOpen}
                                    onOpenChange={(next) => setOpen((current) => (next ? tool.id : current === tool.id ? null : current))}
                                >
                                    <PopoverTrigger asChild>
                                        <button
                                            type="button"
                                            // The open tool fills with ink, the way a chosen segment does; it snaps rather than slides.
                                            className="flex h-12 w-14 cursor-pointer flex-col items-center justify-center gap-1 rounded-sm text-foreground outline-none transition-colors duration-150 ease-out hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[state=open]:bg-primary data-[state=open]:text-primary-foreground"
                                        >
                                            <tool.icon className="size-[18px]"/>
                                            <small className="font-mono text-[10px] leading-none font-medium tracking-[0.06em] uppercase">{tool.label}</small>
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        side="top"
                                        sideOffset={14}
                                        collisionPadding={12}
                                        onOpenAutoFocus={(event) => {
                                            // Land on the first field rather than the close button.
                                            const body = (event.currentTarget as HTMLElement).querySelector("[data-tool-body]");
                                            const first = body?.querySelector<HTMLElement>(FIRST_FIELD);
                                            if (first) {
                                                event.preventDefault();
                                                first.focus();
                                            }
                                        }}
                                        // Room for the card and its caption above, the dock below.
                                        className="flex max-h-[max(220px,calc(100dvh-min(100vw-2rem,42dvh)-12rem))] w-[min(22rem,calc(100vw-24px))] flex-col p-0"
                                    >
                                        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-rule py-2 pr-2 pl-4">
                                            <h2 className="text-sm font-semibold">{tool.title}</h2>
                                            <PopoverClose asChild>
                                                <Button variant="ghost" size="icon-sm" aria-label="Close">
                                                    <X/>
                                                </Button>
                                            </PopoverClose>
                                        </div>
                                        <div data-tool-body className={cn(ruledRowsClass, "min-h-0 overflow-y-auto p-4")}>
                                            {tool.body()}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            );
                        })}
                    </div>
                </motion.nav>
            </div>
        </MotionConfig>
    );
}

export default DockLayout;
