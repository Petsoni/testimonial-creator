import React, {useId} from "react";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {NameTone} from "@/lib/backdrops";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {cn} from "@/lib/utils";
import {labelClass} from "./fieldStyles";

// The card styles print names and companies in this gray by default.
const INK = "#454545";

const TONES: { value: NameTone; label: string }[] = [
    {value: "ink", label: "Ink"},
    {value: "accent", label: "Accent"},
];

/** Name colour, limited to two tones that both pass AA on every card tint. */
function NameToneField() {
    const labelId = useId();
    const {backdrop, nameTone, setNameTone} = useTestimonialContent();
    const swatch: Record<NameTone, string> = {ink: INK, accent: backdrop.accent};

    return (
        <div className="flex flex-col gap-3">
            <div id={labelId} className={cn(labelClass, "font-medium")}>Name colour</div>
            <ToggleGroup
                type="single"
                variant="outline"
                size="sm"
                aria-labelledby={labelId}
                value={nameTone}
                onValueChange={(value) => value && setNameTone(value as NameTone)}
            >
                {TONES.map((tone) => (
                    <ToggleGroupItem key={tone.value} value={tone.value} className="gap-2 text-sm!">
                        <i aria-hidden className="size-3 rounded-full ring-1 ring-black/10" style={{background: swatch[tone.value]}}/>
                        {tone.label}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    );
}

export default NameToneField;
