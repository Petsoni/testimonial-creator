import React, {useId} from "react";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {DisplayTypeEnum} from "@/lib/models/display-type.enum";
import {Field, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {labelClass, labelHintClass} from "./fieldStyles";

const SEPARATORS = [
    {value: "none", glyph: "None"},
    {value: "·", glyph: "·", name: "Middle dot"},
    {value: "—", glyph: "—", name: "Em dash"},
    {value: "•", glyph: "•", name: "Bullet"},
    {value: "/", glyph: "/", name: "Slash"},
    {value: "|", glyph: "|", name: "Vertical bar"},
    {value: "@", glyph: "@", name: "At sign"},
    {value: "at", glyph: "at"},
    {value: "from", glyph: "from"},
];

function CompanyField() {
    const id = useId();
    const {userFirm, setUserFirm, separator, setSeparator, displayType} = useTestimonialContent();
    // Only the side-by-side layout prints a separator between name and company. It stays in place while
    // typing, so the input never changes width under the cursor, and unlocks once there's a company.
    const sideBySide = displayType === DisplayTypeEnum.STYLE1;
    const selected = separator === "" ? "none" : separator;

    return (
        <Field>
            <FieldLabel htmlFor={id} className={labelClass}>
                Company <small className={labelHintClass}>optional</small>
            </FieldLabel>
            <div className="flex gap-2">
                <Input
                    id={id}
                    value={userFirm}
                    onChange={(e) => setUserFirm(e.target.value)}
                    placeholder="Company or role"
                    autoComplete="off"
                    maxLength={60}
                />
                {sideBySide && (
                    <Select
                        value={selected}
                        disabled={userFirm.trim() === ""}
                        onValueChange={(value) => setSeparator(value === "none" ? "" : value)}
                    >
                        <SelectTrigger aria-label="Separator between name and company" className="w-20 shrink-0">
                            <SelectValue>
                                {SEPARATORS.find((option) => option.value === selected)?.glyph}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent align="end">
                            {SEPARATORS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    <span className="min-w-8">{option.glyph}</span>
                                    {option.name && (
                                        <span className="font-mono text-[11px] text-muted-foreground">{option.name}</span>
                                    )}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>
        </Field>
    );
}

export default CompanyField;
