import React from "react";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {Field} from "@/components/ui/field";
import {Slider} from "@/components/ui/slider";
import {labelClass, readoutClass} from "./fieldStyles";

function CornerField() {
    const {cardBorderRadius, setCardBorderRadius} = useTestimonialContent();

    return (
        <Field>
            <div className="flex items-baseline justify-between">
                <div className={labelClass}>Corners</div>
                <output className={readoutClass}>{cardBorderRadius}px</output>
            </div>
            <Slider
                value={[cardBorderRadius]}
                min={0}
                max={40}
                step={1}
                thumbLabel="Card corner radius"
                onValueChange={([value]) => setCardBorderRadius(value)}
                className="py-1.5"
            />
        </Field>
    );
}

export default CornerField;
