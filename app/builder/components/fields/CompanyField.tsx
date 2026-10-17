import React, {useId} from "react";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {Field, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {hintClass, labelClass} from "./fieldStyles";

function CompanyField() {
    const id = useId();
    const {userFirm, setUserFirm} = useTestimonialContent();

    return (
        <Field>
            <FieldLabel htmlFor={id} className={labelClass}>
                Company <small className={hintClass}>optional</small>
            </FieldLabel>
            <Input
                id={id}
                value={userFirm}
                onChange={(e) => setUserFirm(e.target.value)}
                placeholder="Company or role"
                autoComplete="off"
                maxLength={60}
            />
        </Field>
    );
}

export default CompanyField;
