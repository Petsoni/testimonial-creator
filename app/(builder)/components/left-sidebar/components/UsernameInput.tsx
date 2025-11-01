import {Field, FieldLabel} from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import React from 'react';
import {useTestimonialContent} from "@/context/TestimonialContentContext";

function UsernameInput() {

    const {setUsername, setUsernameColor} = useTestimonialContent();

    return (
        <Field className="mb-4 w-full">
            <FieldLabel htmlFor="testimonialUser">Kind words by</FieldLabel>
            <div className="flex flex-row gap-2">
                <Input id="testimonialUser" type="text" placeholder="Username or name"
                       onInput={(e) => setUsername(e.currentTarget.value)}/>
                <input type="color" name="usernameBorderColor" id="usernameBorderColor"
                       className={"w-10 h-full flex flex-row"}
                       onInput={(e) => setUsernameColor(e.currentTarget.value)}/>
            </div>
        </Field>
    );
}

export default UsernameInput;
