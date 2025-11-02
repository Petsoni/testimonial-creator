import React, {useState} from 'react';
import {CardBorderRadiusEnum} from "@/lib/models/border-radius.enum";
import {
    IconBorderCornerIos,
    IconBorderCornerPill,
    IconBorderCornerRounded,
    IconBorderCornerSquare
} from "@tabler/icons-react";
import {Field, FieldLabel} from '@/components/ui/field';
import {useTestimonialContent} from '@/context/TestimonialContentContext';
import {Slider} from "@/components/ui/slider";

function CardBorderRadiusInput() {

    const {setCardBorderRadius, cardBorderRadius} = useTestimonialContent();
    const [stateBorderRadius, setStateBorderRadius] = useState<number[]>([16])

    const borderRadiusIcon = (cardRadius: string) => {
        switch (cardRadius) {
            case CardBorderRadiusEnum.NONE:
                return <IconBorderCornerSquare/>
            case CardBorderRadiusEnum.SMALL:
                return <IconBorderCornerRounded/>
            case CardBorderRadiusEnum.MEDIUM:
                return <IconBorderCornerIos/>
            case CardBorderRadiusEnum.FULL:
                return <IconBorderCornerPill/>
        }
    }

    return (
        <Field className="mb-4">
            <FieldLabel htmlFor="cardBorderRadius">Border radius</FieldLabel>
            <Slider defaultValue={[0]}
                    id={"cardBorderRadius"}
                    className={"my-3 cursor-pointer"}
                    step={1}
                    min={0}
                    max={56}
                    value={stateBorderRadius}
                    onValueChange={(value) => {
                        setCardBorderRadius(value[0]);
                        setStateBorderRadius([value[0]])
                    }}/>
            <p>{cardBorderRadius}px</p>
        </Field>
    );
}

export default CardBorderRadiusInput;