import {Field, FieldLabel} from '@/components/ui/field';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {CardShadowEnum} from '@/lib/models/card-shadow.enum';
import React, {useState} from 'react';
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {Slider} from "@/components/ui/slider";

function CardShadowInput() {

    const [showCardShadow, setShowCardShadow] = useState(false);
    const [cardShadowValue, setCardShadowValue] = useState<number | null>(1);

    const {setCardShadow} = useTestimonialContent();

    return (
        <>
            <div className="flex items-center gap-2 mb-4">
                <Switch id="cardShadowToggle" onCheckedChange={(checked) => {
                    if (checked) {
                        setCardShadow(CardShadowEnum.SMALL);
                        setCardShadowValue(1);
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
                    <Slider defaultValue={[0]}
                            className={"mt-3 cursor-pointer"}
                            step={1}
                            max={Object.entries(CardShadowEnum).length - 1} onValueChange={(value) => {
                        setCardShadow(Object.values(CardShadowEnum)[value[0]]);
                        setCardShadowValue(value[0] + 1)
                    }}/>
                    <p>{cardShadowValue}</p>
                </Field>
            )}
        </>
    );
}

export default CardShadowInput;