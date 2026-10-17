import React, {useId} from "react";
import {RadioGroup as RadioGroupPrimitive} from "radix-ui";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {BACKDROPS, backdropGradient, cardTint} from "@/lib/backdrops";
import {labelClass, readoutClass} from "./fieldStyles";

/** Background picker. The card itself is never coloured directly; it takes a faint tint of this. */
function BackdropField() {
    const labelId = useId();
    const {backdrop, setBackdrop} = useTestimonialContent();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
                <div id={labelId} className={labelClass}>Background</div>
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
                        className="group relative aspect-square cursor-pointer rounded-md outline-none focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-ring"
                    >
                        <span
                            aria-hidden
                            className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-md shadow-[inset_0_0_0_1px_var(--rule)] transition-shadow duration-150 ease-out group-hover:shadow-[inset_0_0_0_2px_var(--rule)]"
                            style={{background: backdropGradient(option)}}
                        >
                            {/* A tiny card, so the swatch previews the tint the card will take. */}
                            <span
                                className="h-[30%] w-[62%] rounded-[1px] shadow-[0_0_0_1px_rgb(17_17_17/0.45)]"
                                style={{background: cardTint(option)}}
                            />
                        </span>
                        <span
                            aria-hidden
                            className="pointer-events-none absolute -inset-1 hidden rounded-[6px] ring-2 ring-primary group-data-[state=checked]:block"
                        />
                    </RadioGroupPrimitive.Item>
                ))}
            </RadioGroupPrimitive.Root>
        </div>
    );
}

export default BackdropField;
