import {Field, FieldDescription, FieldLabel} from '@/components/ui/field';
import {Textarea} from '@/components/ui/textarea';
import {useTestimonialContent} from '@/context/TestimonialContentContext';
import React from 'react';

function TestimonialInput() {

    const {testimonialText, setTestimonialText} = useTestimonialContent();

    return (
        <Field className="mb-4">
            <FieldLabel htmlFor="testimonialDescription">What did they say</FieldLabel>
            <Textarea id="testimonialDescription" placeholder="Their message here..."
                      maxLength={500}
                      onInput={(e) => setTestimonialText(e.currentTarget.value.trim())}/>
            <FieldDescription id="testimonialDescription"
                              className={`text-xs! text-gray-400! text-right ${testimonialText.length < 500 ? 'text-red-500' : ''}`}>
                {testimonialText.length}/500
            </FieldDescription>
        </Field>

    );
}

export default TestimonialInput;