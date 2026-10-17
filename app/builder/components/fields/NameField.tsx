import React, {useId} from "react";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {Field, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {labelClass} from "./fieldStyles";

function NameField() {
    const id = useId();
    const {username, setUsername} = useTestimonialContent();

    return (
        <Field>
            <FieldLabel htmlFor={id} className={labelClass}>Name</FieldLabel>
            <Input
                id={id}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Who said it?"
                autoComplete="off"
                maxLength={60}
            />
        </Field>
    );
}

export default NameField;
