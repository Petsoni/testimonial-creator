import {Field, FieldLabel} from '@/components/ui/field';
import {Label} from '@/components/ui/label';
import {Choicebox, ChoiceboxItem, ChoiceboxItemDescription} from '@/components/ui/shadcn-io/choicebox';
import {Switch} from '@/components/ui/switch';
import {CardShadowEnum} from '@/lib/models/card-shadow.enum';
import React, {useState} from 'react';
import {useTestimonialContent} from "@/context/TestimonialContentContext";

function CardShadowInput() {

    const [showCardShadow, setShowCardShadow] = useState(false);

    const {setCardShadow} = useTestimonialContent();

    return (
        <>
            <div className="flex items-center gap-2 mb-4">
                <Switch id="cardShadowToggle" onCheckedChange={(checked) => {
                    if (checked) {
                        setCardShadow(CardShadowEnum.SMALL);
                    } else {
                        setCardShadow("");
                    }
                    setShowCardShadow(checked);
                }}/>
                <Label htmlFor="cardShadowToggle">Shadow</Label>
            </div>
            {showCardShadow && (
                <Field className="mb-4">
                    <FieldLabel htmlFor="cardShadowAmount">Spread</FieldLabel>
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
        </>
    );
}

export default CardShadowInput;