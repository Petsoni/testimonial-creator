import {Field, FieldLabel} from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import {useTestimonialContent} from '@/context/TestimonialContentContext';
import React from 'react';
import {DisplayTypeEnum} from "@/lib/models/display-type.enum";

function SeparatorInput() {

    const {setSeparator, displayType} = useTestimonialContent();

    return (
        displayType == DisplayTypeEnum.STYLE1 && (
            <Field className="mb-4">
                <FieldLabel htmlFor="separator">Separator</FieldLabel>
                <Input id="separator" type="text" onInput={(e) => setSeparator(e.currentTarget.value)}/>
            </Field>
        )
    )
}

export default SeparatorInput;