"use client";

import React, {createContext, useContext, useState} from "react";
import {CardStyle} from "@/lib/models/card-style.enum";

interface TestimonialContentContextType {
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
    cardStyle: CardStyle;
    setCardStyle: (cardStyle: CardStyle) => void;
    profilePicturePreview: string | undefined;
    setProfilePicturePreview: (imageString: string) => void;
    imageBorderRadius: string;
    setImageBorderRadius: (borderRadius: string) => void;

    cardColor: string;
    setCardColor: (color: string) => void;
    cardBorderRadius: string;
    setCardBorderRadius: (borderRadius: string) => void;
    cardShadow: string;
    setCardShadow: (shadow: string) => void;
}

export const TestimonialContentContext = createContext<TestimonialContentContextType | undefined>(undefined);

// @ts-ignore
export function TestimonialContentProvider({children}) {

    // Left sidebar
    const [username, setUsername] = useState("");
    const [userFirm, setUserFirm] = useState("");
    const [userFirmLink, setUserFirmLink] = useState("");
    const [testimonialText, setTestimonialText] = useState("");
    const [separator, setSeparator] = useState("");
    const [cardStyle, setCardStyle] = useState(CardStyle.STYLE1);
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | undefined>();
    const [imageBorderRadius, setImageBorderRadius] = useState<string>("2xl");

    // Right sidebar
    const [cardColor, setCardColor] = useState("#FFFFFF");
    const [cardBorderRadius, setCardBorderRadius] = useState<string>("rounded-sm");
    const [cardShadow, setCardShadow] = useState<string>("");

    return (
        <TestimonialContentContext.Provider value={{
            username,
            setUsername,
            userFirm,
            setUserFirm,
            testimonialText,
            setTestimonialText,
            separator,
            setSeparator,
            cardStyle,
            setCardStyle,
            profilePicturePreview,
            setProfilePicturePreview,
            imageBorderRadius,
            setImageBorderRadius,
            userFirmLink,
            setUserFirmLink,
            cardColor,
            setCardColor,
            cardBorderRadius,
            setCardBorderRadius,
            cardShadow,
            setCardShadow,
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