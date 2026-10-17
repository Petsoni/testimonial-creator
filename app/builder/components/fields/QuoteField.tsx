import React, {useId} from "react";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {Field, FieldLabel} from "@/components/ui/field";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import {labelClass, readoutClass} from "./fieldStyles";

const QUOTE_LIMIT = 500;

function QuoteField({className}: { className?: string }) {
    const id = useId();
    const {testimonialText, setTestimonialText} = useTestimonialContent();
    const count = testimonialText.length;
    const nearLimit = count >= QUOTE_LIMIT * 0.9;
    const atLimit = count >= QUOTE_LIMIT;

    return (
        <Field>
            <div className="flex items-baseline justify-between gap-2">
                <FieldLabel htmlFor={id} className={labelClass}>Quote</FieldLabel>
                <output
                    htmlFor={id}
                    id={`${id}-count`}
                    className={cn(readoutClass, nearLimit && "text-warn", atLimit && "text-destructive")}
                >
                    {atLimit ? "Limit reached · " : ""}{count} / {QUOTE_LIMIT}
                </output>
            </div>
            <Textarea
                id={id}
                value={testimonialText}
                onChange={(e) => setTestimonialText(e.target.value)}
                placeholder="Paste what they said about you"
                maxLength={QUOTE_LIMIT}
                rows={5}
                aria-describedby={`${id}-count`}
                className={cn("min-h-30", className)}
            />
        </Field>
    );
}

export default QuoteField;
