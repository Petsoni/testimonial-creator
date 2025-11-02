import React from 'react';
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {Field, FieldLabel} from '@/components/ui/field';
import {Input} from "@/components/ui/input";

function FirmInput() {

    const {setUserFirm, setUserFirmLink} = useTestimonialContent();

    return (
        <Field className="mb-4">
            <FieldLabel htmlFor="userCorp">From</FieldLabel>
            <Input id="userCorp" type="text" placeholder="Corporation name"
                   onInput={(e) => setUserFirm(e.currentTarget.value)}/>
            {/*<Input id="userCorpLink" type="text" placeholder="Link"*/}
            {/*       onInput={(e) => setUserFirmLink(e.currentTarget.value)}/>*/}
        </Field>
    );
}

export default FirmInput;