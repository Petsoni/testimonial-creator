"use client";

import React, {createContext, useContext, useState} from "react";
import {DisplayTypeEnum} from "@/lib/models/display-type.enum";
import {CardShadowEnum} from "@/lib/models/card-shadow.enum";
import {
    Backdrop,
    borderTint,
    cardTint,
    DEFAULT_BACKDROP,
    findBackdrop,
    nameColor,
    NameTone,
} from "@/lib/backdrops";

export interface TestimonialContentContextType {
    // Content
    username: string;
    setUsername: (username: string) => void;
    userFirm: string;
    setUserFirm: (userFirm: string) => void;
    userFirmLink: string;
    setUserFirmLink: (userFirmLink: string) => void;
    testimonialText: string;
    setTestimonialText: (text: string) => void;
    separator: string;
    setSeparator: (separator: string) => void;
    profilePicturePreview: string | undefined;
    setProfilePicturePreview: (imageString: string | undefined) => void;
    imageBorderRadius: number;
    setImageBorderRadius: (borderRadius: number) => void;

    // Design
    displayType: DisplayTypeEnum;
    setDisplayType: (displayType: DisplayTypeEnum) => void;
    backdrop: Backdrop;
    setBackdrop: (backdropId: string) => void;
    nameTone: NameTone;
    setNameTone: (nameTone: NameTone) => void;
    cardBorderRadius: number;
    setCardBorderRadius: (borderRadius: number) => void;
    cardShadow: string;
    setCardShadow: (shadow: string) => void;
    cardBorderWidth: number;
    setCardBorderWidth: (borderWidth: number) => void;

    // Derived from the backdrop so every combination stays readable; the card styles read these.
    cardColor: string;
    cardBorderColor: string;
    usernameColor: string;

    resetCard: () => void;
}

export const TestimonialContentContext = createContext<TestimonialContentContextType | undefined>(undefined);

// A near-white card needs a shadow to read on the light backdrops.
const DEFAULT_CARD_SHADOW: string = CardShadowEnum.MEDIUM;

export function TestimonialContentProvider({children}: { children: React.ReactNode }) {

    // Content
    const [username, setUsername] = useState("");
    const [userFirm, setUserFirm] = useState("");
    const [userFirmLink, setUserFirmLink] = useState("");
    const [testimonialText, setTestimonialText] = useState("");
    const [separator, setSeparator] = useState("");
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | undefined>();
    const [imageBorderRadius, setImageBorderRadius] = useState<number>(0);

    // Design
    const [displayType, setDisplayType] = useState(DisplayTypeEnum.STYLE1);
    const [backdropId, setBackdropId] = useState(DEFAULT_BACKDROP.id);
    const [nameTone, setNameTone] = useState<NameTone>("ink");
    const [cardBorderRadius, setCardBorderRadius] = useState<number>(16);
    const [cardShadow, setCardShadow] = useState<string>(DEFAULT_CARD_SHADOW);
    const [cardBorderWidth, setCardBorderWidth] = useState<number>(0);

    const backdrop = findBackdrop(backdropId);

    const resetCard = () => {
        setUsername("");
        setUserFirm("");
        setUserFirmLink("");
        setTestimonialText("");
        setSeparator("");
        setProfilePicturePreview(undefined);
        setImageBorderRadius(0);
        setDisplayType(DisplayTypeEnum.STYLE1);
        setBackdropId(DEFAULT_BACKDROP.id);
        setNameTone("ink");
        setCardBorderRadius(16);
        setCardShadow(DEFAULT_CARD_SHADOW);
        setCardBorderWidth(0);
    };

    return (
        <TestimonialContentContext.Provider value={{
            username,
            setUsername,
            userFirm,
            setUserFirm,
            userFirmLink,
            setUserFirmLink,
            testimonialText,
            setTestimonialText,
            separator,
            setSeparator,
            profilePicturePreview,
            setProfilePicturePreview,
            imageBorderRadius,
            setImageBorderRadius,
            displayType,
            setDisplayType,
            backdrop,
            setBackdrop: setBackdropId,
            nameTone,
            setNameTone,
            cardBorderRadius,
            setCardBorderRadius,
            cardShadow,
            setCardShadow,
            cardBorderWidth,
            setCardBorderWidth,
            cardColor: cardTint(backdrop),
            cardBorderColor: cardBorderWidth > 0 ? borderTint(backdrop) : "transparent",
            usernameColor: nameColor(backdrop, nameTone),
            resetCard,
        }}>
            {children}
        </TestimonialContentContext.Provider>
    )
}

export function useTestimonialContent() {
    const context = useContext(TestimonialContentContext);
    if (!context) {
        throw new Error("useTestimonialContent must be defined");
    }
    return context;
}
