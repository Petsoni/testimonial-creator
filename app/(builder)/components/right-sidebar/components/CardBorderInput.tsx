import React, {useState} from 'react';
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {Field, FieldDescription, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {useTestimonialContent} from "@/context/TestimonialContentContext";

function CardBorderInput() {

    const [showCardBorder, setShowCardBorder] = useState(false);

    const {
        cardBorderWidth,
        cardBorderColor,
        setCardBorderWidth,
        setCardBorderColor,
    } = useTestimonialContent()

    return (
        <>
            <div className="flex items-center gap-2 mb-4">
                <Switch id="cardBorderToggle" onCheckedChange={(checked) => {
                    if (checked) {
                        setCardBorderWidth(1);
                        setCardBorderColor("#ededed");
                    } else {
                        setCardBorderWidth(0);
                        setCardBorderColor("transparent");
                    }
                    setShowCardBorder(checked);
                }}/>
                <Label htmlFor="cardBorderToggle">Border</Label>
            </div>
            {showCardBorder && (
                <>
                    <Field className="mb-4">
                        <FieldLabel htmlFor="cardShadowAmount">Width</FieldLabel>
                        <Input type={"number"} inputMode={"numeric"} max={5}
                               defaultValue={cardBorderWidth}
                               onInput={(e) => {
                                   if (+e.currentTarget.value > 5) {
                                       setCardBorderWidth(5)
                                       return;
                                   } else if (+e.currentTarget.value < -1) {
                                       setCardBorderWidth(1)
                                       return;
                                   }
                                   setCardBorderWidth(+e.currentTarget.value)
                               }}/>
                    </Field>
                    <Field className="mb-4">
                        <FieldLabel htmlFor="cardBorderColor">Color</FieldLabel>
                        <input type="color" name="color" id="cardBorderColor"
                               defaultValue={cardBorderColor}
                               onInput={(e) => setCardBorderColor(e.currentTarget.value)}/>
                        <FieldDescription className={"text-gray-600 w-full text-right flex justify-between items-center"}>
                            <span>Hex:</span>
                            {cardBorderColor}
                        </FieldDescription>
                    </Field>
                </>
            )}
        </>
    );
}

export default CardBorderInput;