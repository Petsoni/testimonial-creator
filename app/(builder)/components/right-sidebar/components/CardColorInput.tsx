import {Field, FieldDescription, FieldLabel} from '@/components/ui/field';
import React from 'react';
import {useTestimonialContent} from "@/context/TestimonialContentContext";

function CardColorInput() {

    const {cardColor, setCardColor} = useTestimonialContent();

    return (
        <Field className="mb-4">
            <FieldLabel htmlFor="cardColor">Color</FieldLabel>
            <input type="color" name="color" id="cardColor"
                   onInput={(e) => setCardColor(e.currentTarget.value)}/>
            <FieldDescription className={"text-gray-500"}>{cardColor}</FieldDescription>
        </Field>
    );
}

export default CardColorInput;