import React, {useId} from "react";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {CardShadowEnum} from "@/lib/models/card-shadow.enum";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {labelClass} from "./fieldStyles";

const SHADOWS = [
    {value: "none", label: "None"},
    {value: CardShadowEnum.SMALL, label: "Soft"},
    {value: CardShadowEnum.MEDIUM, label: "Medium"},
    {value: CardShadowEnum.LARGE, label: "Strong"},
    {value: CardShadowEnum.XLARGE, label: "Float"},
];

function ShadowField() {
    const labelId = useId();
    const {cardShadow, setCardShadow} = useTestimonialContent();

    return (
        <div className="flex flex-col gap-2">
            <div id={labelId} className={labelClass}>Shadow</div>
            <ToggleGroup
                type="single"
                variant="outline"
                size="sm"
                aria-labelledby={labelId}
                value={cardShadow || "none"}
                onValueChange={(value) => value && setCardShadow(value === "none" ? "" : value)}
            >
                {SHADOWS.map((shadow) => (
                    <ToggleGroupItem key={shadow.value} value={shadow.value} className="px-1">
                        {shadow.label}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    );
}

export default ShadowField;
