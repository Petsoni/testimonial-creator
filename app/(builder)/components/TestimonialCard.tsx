import React from 'react';
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import CardStyle1 from "@/app/(builder)/components/card-styles/CardStyle1";
import {DisplayTypeEnum} from '@/lib/models/display-type.enum';
import CardStyle2 from './card-styles/CardStyle2';

function TestimonialCard() {

    const testimonialContextProps = useTestimonialContent();
    const {displayType} = useTestimonialContent();

    switch (displayType) {
        case DisplayTypeEnum.STYLE1:
            return <CardStyle1 cardProps={testimonialContextProps}/>
        case DisplayTypeEnum.STYLE2:
            return <CardStyle2 cardProps={testimonialContextProps}/>
    }
}

export default TestimonialCard;