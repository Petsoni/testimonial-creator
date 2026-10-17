import React, {useId} from "react";
import {motion} from "motion/react";
import {RadioGroup as RadioGroupPrimitive} from "radix-ui";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {BACKDROPS, backdropGradient, cardTint} from "@/lib/backdrops";
import {spring} from "@/lib/motion";
import {cn} from "@/lib/utils";
import {labelClass, readoutClass} from "./fieldStyles";

/** Background picker. The card itself is never coloured directly; it takes a faint tint of this. */
function BackdropField() {
    const labelId = useId();
    const indicatorId = useId();
    const {backdrop, setBackdrop} = useTestimonialContent();

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
                <div id={labelId} className={cn(labelClass, "font-medium")}>Background</div>
                <output className={readoutClass}>{backdrop.name}</output>
            </div>
            <RadioGroupPrimitive.Root
                aria-labelledby={labelId}
                value={backdrop.id}
                onValueChange={setBackdrop}
                className="grid grid-cols-4 gap-2"
            >
                {BACKDROPS.map((option) => (
                    <RadioGroupPrimitive.Item
                        key={option.id}
                        value={option.id}
                        aria-label={option.name}
                        className="group relative aspect-square cursor-pointer rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                        <span
                            aria-hidden
                            className="absolute inset-0.5 flex items-center justify-center overflow-hidden rounded-md ring-1 ring-black/10 transition-transform duration-150 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                            style={{background: backdropGradient(option)}}
                        >
                            {/* A tiny card, so the swatch previews the tint the card will take. */}
                            <span className="h-[30%] w-[62%] rounded-[3px] shadow-sm" style={{background: cardTint(option)}}/>
                        </span>
                        {backdrop.id === option.id && (
                            <motion.span
                                aria-hidden
                                layoutId={indicatorId}
                                transition={spring.snappy}
                                className="pointer-events-none absolute -inset-0.5 rounded-[10px] ring-2 ring-primary"
                            />
                        )}
                    </RadioGroupPrimitive.Item>
                ))}
            </RadioGroupPrimitive.Root>
        </div>
    );
}

export default BackdropField;
