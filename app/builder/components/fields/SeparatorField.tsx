import React, {useId} from "react";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {DisplayTypeEnum} from "@/lib/models/display-type.enum";
import {Field} from "@/components/ui/field";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {cn} from "@/lib/utils";
import {hintClass, labelClass} from "./fieldStyles";

const SEPARATORS = [
    {value: "none", glyph: "None", label: "No separator"},
    {value: "·", glyph: "·", label: "Middle dot"},
    {value: "—", glyph: "—", label: "Em dash"},
    {value: "/", glyph: "/", label: "Slash"},
    {value: "|", glyph: "|", label: "Vertical bar"},
    {value: "at", glyph: "at", label: "The word at"},
];

function SeparatorField() {
    const labelId = useId();
    const {separator, setSeparator, displayType} = useTestimonialContent();
    // Only the side-by-side layout prints a separator between name and company.
    const disabled = displayType !== DisplayTypeEnum.STYLE1;

    return (
        <Field data-disabled={disabled || undefined}>
            <div id={labelId} className={cn(labelClass, "font-medium")}>Separator</div>
            <ToggleGroup
                type="single"
                variant="outline"
                size="sm"
                value={separator === "" ? "none" : separator}
                onValueChange={(value) => value && setSeparator(value === "none" ? "" : value)}
                aria-labelledby={labelId}
                disabled={disabled}
            >
                {SEPARATORS.map((option) => (
                    <ToggleGroupItem key={option.value} value={option.value} aria-label={option.label} className="text-sm!">
                        {option.glyph}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
            {disabled && <small className={hintClass}>Only the Side by side layout uses a separator.</small>}
        </Field>
    );
}

export default SeparatorField;
