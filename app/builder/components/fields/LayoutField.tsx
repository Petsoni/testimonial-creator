import React, {useId} from "react";
import {RadioGroup as RadioGroupPrimitive} from "radix-ui";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {DisplayTypeEnum} from "@/lib/models/display-type.enum";
import {cn} from "@/lib/utils";
import {labelClass} from "./fieldStyles";

const LAYOUTS = [
    {value: DisplayTypeEnum.STYLE1, name: "Side by side", hint: "Photo beside the quote"},
    {value: DisplayTypeEnum.STYLE2, name: "Stacked", hint: "Name above the quote"},
];

/** The card as a wireframe: ink outline, a crossed-out photo, grey lines for the quote, an ink line for the name. */
function LayoutSchematic({type}: { type: DisplayTypeEnum }) {
    const line = "h-[3px] bg-[#b5b2ac]";
    const name = "h-[3px] w-1/2 bg-rule";
    const photo = "wf-placeholder size-3 shrink-0 border border-rule";

    return (
        <div aria-hidden className="flex aspect-[16/9] w-full items-center justify-center rounded-sm border border-dashed border-muted-line bg-[#fafaf8] p-2">
            <div className="w-full rounded-sm border border-rule bg-background p-1.5">
                {type === DisplayTypeEnum.STYLE1 ? (
                    <div className="flex gap-1.5">
                        <div className={photo}/>
                        <div className="flex flex-1 flex-col gap-1">
                            <div className={line}/>
                            <div className={cn(line, "w-4/5")}/>
                            <div className={cn(name, "mt-1")}/>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                            <div className={photo}/>
                            <div className={name}/>
                        </div>
                        <div className={line}/>
                        <div className={cn(line, "w-4/5")}/>
                    </div>
                )}
            </div>
        </div>
    );
}

function LayoutField() {
    const labelId = useId();
    const {displayType, setDisplayType} = useTestimonialContent();

    return (
        <div className="flex flex-col gap-2">
            <div id={labelId} className={labelClass}>Layout</div>
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
                        className="group relative flex cursor-pointer flex-col gap-1.5 rounded-md border border-rule bg-background p-1.5 pb-2 text-left outline-none transition-colors duration-150 ease-out hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                        <LayoutSchematic type={layout.value}/>
                        <span className="flex items-center gap-1.5 px-0.5 text-xs leading-tight font-medium">
                            {/* A radio dot, so the choice never rests on the outline alone. */}
                            <span
                                aria-hidden
                                className="size-2.5 shrink-0 rounded-full border border-rule bg-background group-data-[state=checked]:bg-primary group-data-[state=checked]:shadow-[inset_0_0_0_2px_var(--background)]"
                            />
                            {layout.name}
                        </span>
                        {/* The chosen card's edge thickens to 2px ink. It snaps; nothing slides. */}
                        <span
                            aria-hidden
                            className="pointer-events-none absolute -inset-px hidden rounded-md ring-2 ring-primary ring-inset group-data-[state=checked]:block"
                        />
                    </RadioGroupPrimitive.Item>
                ))}
            </RadioGroupPrimitive.Root>
        </div>
    );
}

export default LayoutField;
