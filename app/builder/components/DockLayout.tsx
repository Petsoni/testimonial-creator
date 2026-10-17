import React, {type ComponentType, type ReactNode, useState} from "react";
import {MotionConfig, motion} from "motion/react";
import {Eraser, ImageIcon, Palette, SquareRoundCorner, Type, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Popover, PopoverClose, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {duration, ease, spring} from "@/lib/motion";
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
                <SeparatorField/>
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
    const {resetCard} = useTestimonialContent();
    // While a tool is open the card moves to the top so the popover never covers it.
    const editing = open !== null;

    return (
        <MotionConfig reducedMotion="user" transition={{duration: duration.base, ease: ease.out}}>
            <div className="relative flex h-dvh min-h-[480px] flex-col overflow-hidden">
                <header className="relative z-20 flex shrink-0 items-center justify-between gap-3 px-4 pt-4 sm:px-6 sm:pt-5">
                    <Wordmark collapse/>
                    <div className="flex items-center gap-1.5">
                        <Button variant="ghost" size="sm" onClick={resetCard} aria-label="Clear card" className="text-sm!">
                            <Eraser/>
                            <span className="hidden text-sm! sm:inline">Clear</span>
                        </Button>
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
                    <div className="pointer-events-auto flex items-center gap-1 rounded-2xl border bg-background/85 p-1.5 shadow-lg ring-1 ring-black/5 backdrop-blur-md">
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
                                            className="relative flex h-12 w-14 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[state=open]:text-foreground"
                                        >
                                            {isOpen && (
                                                <motion.span
                                                    layoutId="dock-active-tool"
                                                    transition={spring.snappy}
                                                    className="absolute inset-0 rounded-xl bg-accent"
                                                />
                                            )}
                                            <tool.icon className="relative size-[18px]"/>
                                            <small className="relative text-[11px] leading-none">{tool.label}</small>
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
                                        <div className="flex shrink-0 items-center justify-between gap-2 border-b py-2 pr-2 pl-4">
                                            <h2 className="text-sm! font-semibold! text-foreground">{tool.title}</h2>
                                            <PopoverClose asChild>
                                                <Button variant="ghost" size="icon-sm" aria-label="Close">
                                                    <X/>
                                                </Button>
                                            </PopoverClose>
                                        </div>
                                        <div data-tool-body className="flex min-h-0 flex-col gap-5 overflow-y-auto p-4">
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
