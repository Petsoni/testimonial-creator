import React, {useId} from "react";
import {motion} from "motion/react";
import {RadioGroup as RadioGroupPrimitive} from "radix-ui";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {DisplayTypeEnum} from "@/lib/models/display-type.enum";
import {spring} from "@/lib/motion";
import {cn} from "@/lib/utils";
import {labelClass} from "./fieldStyles";

const LAYOUTS = [
    {value: DisplayTypeEnum.STYLE1, name: "Side by side", hint: "Photo beside the quote"},
    {value: DisplayTypeEnum.STYLE2, name: "Stacked", hint: "Name above the quote"},
];

function LayoutSchematic({type}: { type: DisplayTypeEnum }) {
    const bar = "h-1 rounded-full bg-foreground/25";
    return (
        <div aria-hidden className="flex aspect-[16/9] w-full items-center justify-center rounded-md bg-muted p-2">
            <div className="w-full rounded-sm bg-background p-1.5 shadow-xs">
                {type === DisplayTypeEnum.STYLE1 ? (
                    <div className="flex gap-1.5">
                        <div className="size-3 shrink-0 rounded-full bg-foreground/30"/>
                        <div className="flex flex-1 flex-col gap-1">
                            <div className={bar}/>
                            <div className={cn(bar, "w-4/5")}/>
                            <div className={cn(bar, "mt-1 w-1/2 bg-foreground/45")}/>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                            <div className="size-3 shrink-0 rounded-full bg-foreground/30"/>
                            <div className={cn(bar, "w-1/2 bg-foreground/45")}/>
                        </div>
                        <div className={bar}/>
                        <div className={cn(bar, "w-4/5")}/>
                    </div>
                )}
            </div>
        </div>
    );
}

function LayoutField() {
    const labelId = useId();
    const indicatorId = useId();
    const {displayType, setDisplayType} = useTestimonialContent();

    return (
        <div className="flex flex-col gap-3">
            <div id={labelId} className={cn(labelClass, "font-medium")}>Layout</div>
            <RadioGroupPrimitive.Root
                aria-labelledby={labelId}
                value={displayType}
                onValueChange={(value) => setDisplayType(value as DisplayTypeEnum)}
                className="grid grid-cols-2 gap-2"
            >
                {LAYOUTS.map((layout) => (
                    <RadioGroupPrimitive.Item
                        key={layout.value}
                        value={layout.value}
                        aria-label={`${layout.name}: ${layout.hint}`}
                        className="relative flex cursor-pointer flex-col gap-2 rounded-lg border bg-background p-2 text-left outline-none transition-colors hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                        <LayoutSchematic type={layout.value}/>
                        <span className="text-sm! leading-tight">{layout.name}</span>
                        {displayType === layout.value && (
                            <motion.span
                                layoutId={indicatorId}
                                transition={spring.snappy}
                                className="pointer-events-none absolute -inset-px rounded-lg ring-2 ring-primary"
                            />
                        )}
                    </RadioGroupPrimitive.Item>
                ))}
            </RadioGroupPrimitive.Root>
        </div>
    );
}

export default LayoutField;
