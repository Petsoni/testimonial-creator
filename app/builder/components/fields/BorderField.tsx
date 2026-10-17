import React, {useId} from "react";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {Slider} from "@/components/ui/slider";
import {cn} from "@/lib/utils";
import {labelClass, readoutClass} from "./fieldStyles";

/** Border on/off and width. Its colour follows the background, so there's nothing to pick. */
function BorderField() {
    const switchId = useId();
    const {cardBorderWidth, setCardBorderWidth} = useTestimonialContent();
    const on = cardBorderWidth > 0;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <Label htmlFor={switchId} className={labelClass}>Border</Label>
                <Switch id={switchId} checked={on} onCheckedChange={(checked) => setCardBorderWidth(checked ? 1 : 0)}/>
            </div>
            <div className={cn("flex flex-col gap-1", !on && "opacity-50")}>
                <output className={readoutClass}>{on ? `${cardBorderWidth}px, matched to the background` : "Off"}</output>
                <Slider
                    value={[Math.max(cardBorderWidth, 1)]}
                    min={1}
                    max={4}
                    step={1}
                    disabled={!on}
                    thumbLabel="Border width"
                    onValueChange={([value]) => setCardBorderWidth(value)}
                    className="py-1.5"
                />
            </div>
        </div>
    );
}

export default BorderField;
