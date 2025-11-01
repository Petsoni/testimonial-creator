import {useTestimonialContent} from '@/context/TestimonialContentContext';
import {DisplayTypeEnum} from '@/lib/models/display-type.enum';
import reactElementToJSXString from "react-element-to-jsx-string";
import CardStyle1 from "@/app/(builder)/components/card-styles/CardStyle1";
import CardStyle2 from "@/app/(builder)/components/card-styles/CardStyle2";
import { useEffect } from 'react';

function TestimonialCardCode() {
    const testimonialContextProps = useTestimonialContent();
    const {setRenderedCardContent, displayType} = useTestimonialContent();

    useEffect(() => {
        let renderedCardContent: string;

        switch (displayType) {
            case DisplayTypeEnum.STYLE1:
                renderedCardContent = reactElementToJSXString(CardStyle1({cardProps: testimonialContextProps}));
                break;
            case DisplayTypeEnum.STYLE2:
                renderedCardContent = reactElementToJSXString(CardStyle2({cardProps: testimonialContextProps}));
                break;
            default:
                return;
        }

        setRenderedCardContent(renderedCardContent);
    }, [displayType, testimonialContextProps, setRenderedCardContent]);

    switch (displayType) {
        case DisplayTypeEnum.STYLE1:
            return reactElementToJSXString(CardStyle1({cardProps: testimonialContextProps}));
        case DisplayTypeEnum.STYLE2:
            return reactElementToJSXString(CardStyle2({cardProps: testimonialContextProps}));
        default:
            return null;
    }}

export default TestimonialCardCode;