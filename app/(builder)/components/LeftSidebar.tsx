import React from 'react';
import {Field, FieldDescription, FieldLabel} from "@/components/ui/field";
import {Input} from '@/components/ui/input';
import {Textarea} from "@/components/ui/textarea";

function LeftSidebar() {
    return (
        <div className="flex flex-col h-screen bg-white p-8 border-r border-gray-200 max-w-1/4 w-full">
            <h5 className="mb-6">Content input</h5>
            <Field className="mb-4">
                <FieldLabel htmlFor="testimonialUser">Kind words by</FieldLabel>
                <Input id="testimonialUser" type="text" placeholder="Username or name"/>
            </Field>
            <Field className="mb-4">
                <FieldLabel htmlFor="userCorp">From</FieldLabel>
                <Input id="userCorp" type="text" placeholder="Corporation name"/>
                <Input id="userCorpLink" type="text" placeholder="Link"/>
            </Field>
            <Field className="mb-4">
                <FieldLabel htmlFor="separator">Separator</FieldLabel>
                <Input id="separator" type="text"/>
            </Field>
            <Field className="mb-4">
                <FieldLabel htmlFor="testimonialDescription">What did they say</FieldLabel>
                <Textarea id="testimonialDescription" placeholder="Their message here..."/>
            </Field>
        </div>
    );
}

export default LeftSidebar;