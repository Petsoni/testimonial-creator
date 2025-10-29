"use client";

import React, {useState} from 'react';
import {Field, FieldDescription, FieldLabel} from "@/components/ui/field";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {Choicebox, ChoiceboxItem, ChoiceboxItemDescription} from '@/components/ui/shadcn-io/choicebox';
import {CardBorderRadiusEnum} from '@/lib/models/border-radius.enum';
import {
    IconBorderCornerIos,
    IconBorderCornerPill,
    IconBorderCornerRounded,
    IconBorderCornerSquare
} from "@tabler/icons-react";
import {Separator} from '@/components/ui/separator';
import {Switch} from "@/components/ui/switch";
import {Label} from '@/components/ui/label';
import {CardShadowEnum} from "@/lib/models/card-shadow.enum";

function RightSidebar() {

    const {
        cardColor,
        setCardColor,
        setCardBorderRadius,
        setCardShadow
    } = useTestimonialContent()

    const [showCardShadow, setShowCardShadow] = useState(false);

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
        <div className="flex flex-col h-screen bg-white p-8 border-l border-gray-200 max-w-1/4 w-full">
            <h5 className={"mb-6"}>Make it your own</h5>
            <Field className="mb-4">
                <FieldLabel htmlFor="testimonialUser">Display type</FieldLabel>
                {/*TODO*/}
            </Field>
            <Field className="mb-4">
                <FieldLabel htmlFor="cardColor">Color</FieldLabel>
                <input type="color" name="color" id="cardColor"
                       onInput={(e) => setCardColor(e.currentTarget.value)}/>
                <FieldDescription className={"text-gray-500"}>{cardColor}</FieldDescription>
            </Field>
            <Field className="mb-4">
                <FieldLabel htmlFor="cardColor">Border radius</FieldLabel>
                <Choicebox defaultValue="2xl" className={"flex flex-row w-full"}>
                    {Object.entries(CardBorderRadiusEnum).map(([key, value]) => (
                        <ChoiceboxItem onClick={() => {
                            setCardBorderRadius(value);
                        }} key={key} value={value} className={"w-full justify-center"}>
                            <ChoiceboxItemDescription>
                                {borderRadiusIcon(value)}
                            </ChoiceboxItemDescription>
                        </ChoiceboxItem>
                    ))}
                </Choicebox>
            </Field>
            <Separator className={"mb-4"}/>
            <div className="flex items-center gap-2 mb-4">
                <Switch id="cardShadowToggle" onCheckedChange={() => setShowCardShadow((prev) => {
                    setCardShadow("");
                    if (!prev) {
                        setCardShadow(CardShadowEnum.SMALL);
                    }
                    return !prev;
                })}/>
                <Label htmlFor="cardShadowToggle">Shadow</Label>
            </div>
            {showCardShadow && (
                <Field className="mb-4">
                    <FieldLabel htmlFor="cardShadowAmount">Border radius</FieldLabel>
                    <Choicebox defaultValue="shadow-sm" className={"flex flex-row w-full"}>
                        {Object.entries(CardShadowEnum).map(([key, value]) => (
                            <ChoiceboxItem onClick={() => {
                                setCardShadow(value);
                            }} key={key} value={value} className={"w-full justify-center"}>
                                <ChoiceboxItemDescription>
                                    {key.toUpperCase()}
                                </ChoiceboxItemDescription>
                            </ChoiceboxItem>
                        ))}
                    </Choicebox>
                </Field>
            )}
        </div>
    );
}

export default RightSidebar;