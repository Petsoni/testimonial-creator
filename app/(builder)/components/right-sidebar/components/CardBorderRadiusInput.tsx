import React from 'react';
import {CardBorderRadiusEnum} from "@/lib/models/border-radius.enum";
import {
    IconBorderCornerIos,
    IconBorderCornerPill,
    IconBorderCornerRounded,
    IconBorderCornerSquare
} from "@tabler/icons-react";
import {Field, FieldLabel} from '@/components/ui/field';
import {Choicebox, ChoiceboxItem, ChoiceboxItemDescription} from '@/components/ui/shadcn-io/choicebox';
import {useTestimonialContent} from '@/context/TestimonialContentContext';

function CardBorderRadiusInput() {

    const {setCardBorderRadius} = useTestimonialContent();

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
            <FieldLabel htmlFor="cardColor">Border radius</FieldLabel>
            <Choicebox defaultValue="rounded-md" className={"flex flex-row w-full"}>
                {Object.entries(CardBorderRadiusEnum).map(([key, value]) => (
                    <ChoiceboxItem onClick={() => {
                        setCardBorderRadius(value);
                    }} key={key} value={value} className={"w-full justify-center"}>
                        <ChoiceboxItemDescription>
                            {/*<div className={`w-12 h-8 border-2 ${value}`}></div>*/}
                            {borderRadiusIcon(value)}
                        </ChoiceboxItemDescription>
                    </ChoiceboxItem>
                ))}
            </Choicebox>
        </Field>
    );
}

export default CardBorderRadiusInput;