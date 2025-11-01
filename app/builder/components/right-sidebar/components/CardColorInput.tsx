import {Field, FieldDescription, FieldLabel} from '@/components/ui/field';
import React from 'react';
import {useTestimonialContent} from "@/context/TestimonialContentContext";

function CardColorInput() {

    const {cardColor, setCardColor} = useTestimonialContent();

    return (
        <Field className="mb-4 relative">
            <FieldLabel htmlFor="cardColor">Color</FieldLabel>
            <input type="color" name="color" id="cardColor" className={"h-10 w-full relative"}
                   defaultValue={cardColor}
                   onInput={(e) => setCardColor(e.currentTarget.value)}/>
            <FieldDescription className={"text-gray-600 w-full text-right flex justify-between items-center"}>
                <span>Hex:</span>
                {cardColor}
            </FieldDescription>
        </Field>
    );
}

export default CardColorInput;