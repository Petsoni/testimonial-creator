import React, {useId} from "react";
import {AnimatePresence, motion} from "motion/react";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {DisplayTypeEnum} from "@/lib/models/display-type.enum";
import {Field, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {hintClass, labelClass} from "./fieldStyles";

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
    // Only the side-by-side layout prints a separator between name and company.
    const showSeparator = userFirm != "" && displayType === DisplayTypeEnum.STYLE1;
    const selected = separator === "" ? "none" : separator;

    return (
        <Field>
            <FieldLabel htmlFor={id} className={labelClass}>
                Company <small className={hintClass}>optional</small>
            </FieldLabel>
            <div className="flex">
                <Input
                    id={id}
                    value={userFirm}
                    onChange={(e) => setUserFirm(e.target.value)}
                    placeholder="Company or role"
                    autoComplete="off"
                    maxLength={60}
                />
                <AnimatePresence initial={false}>
                    {showSeparator && (
                        <motion.div
                            key="separator"
                            className="shrink-0"
                            initial={{width: 0, opacity: 0, overflow: "hidden"}}
                            animate={{width: "auto", opacity: 1, transitionEnd: {overflow: "visible"}}}
                            exit={{width: 0, opacity: 0, overflow: "hidden"}}
                        >
                            <Select value={selected} onValueChange={(value) => setSeparator(value === "none" ? "" : value)}>
                                <SelectTrigger aria-label="Separator" className="ml-2 w-20">
                                    <SelectValue className="text-sm!">
                                        {SEPARATORS.find((option) => option.value === selected)?.glyph}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent align="end">
                                    {SEPARATORS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            <span className="min-w-8 text-sm!">{option.glyph}</span>
                                            {option.name && <span className="text-sm! text-muted-foreground">{option.name}</span>}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Field>
    );
}

export default CompanyField;
