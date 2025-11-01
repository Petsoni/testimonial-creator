import {Field, FieldLabel} from '@/components/ui/field';
import {Choicebox, ChoiceboxItem, ChoiceboxItemDescription} from '@/components/ui/shadcn-io/choicebox';
import React from 'react';
import {DisplayTypeEnum} from "@/lib/models/display-type.enum";
import {useTestimonialContent} from '@/context/TestimonialContentContext';

function DisplayTypeInput() {

    const {setDisplayType, setSeparator} = useTestimonialContent();

    return (
        <Field className="mb-4">
            <FieldLabel htmlFor="testimonialUser">Display type</FieldLabel>
            <Choicebox defaultValue="STYLE1" className={"flex flex-row w-full"}>
                {Object.entries(DisplayTypeEnum).map(([key, value]) => (
                    <ChoiceboxItem defaultValue={DisplayTypeEnum.STYLE1} onClick={() => {
                        if (value == DisplayTypeEnum.STYLE2) {
                            setSeparator("");
                        }
                        setDisplayType(value);
                    }} key={key} value={value} className={"w-full justify-center"}>
                        <ChoiceboxItemDescription>
                            {key.toUpperCase()}
                        </ChoiceboxItemDescription>
                    </ChoiceboxItem>
                ))}
            </Choicebox>
        </Field>
    );
}

export default DisplayTypeInput;