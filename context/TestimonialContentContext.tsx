"use client";

import React, {createContext, useContext, useState} from "react";
import {DisplayTypeEnum} from "@/lib/models/display-type.enum";

export interface TestimonialContentContextType {
    // Left sidebar
    username: string;
    setUsername: (username: string) => void;
    usernameColor: string;
    setUsernameColor: (usernameColor: string) => void;
    userFirm: string;
    setUserFirm: (userFirm: string) => void;
    userFirmLink: string;
    setUserFirmLink: (userFirmLink: string) => void;
    testimonialText: string;
    setTestimonialText: (text: string) => void;
    separator: string;
    setSeparator: (separator: string) => void;
    profilePicturePreview: string | undefined;
    setProfilePicturePreview: (imageString: string) => void;
    imageBorderRadius: number;
    setImageBorderRadius: (borderRadius: number) => void;

    // Right sidebar
    displayType: DisplayTypeEnum;
    setDisplayType: (displayType: DisplayTypeEnum) => void;
    cardColor: string;
    setCardColor: (color: string) => void;
    cardBorderRadius: number;
    setCardBorderRadius: (borderRadius: number) => void;
    // setCardBorderRadiusClass: (borderRadius: number) => void;
    cardShadow: string;
    setCardShadow: (shadow: string) => void;
    cardBorderWidth: number;
    setCardBorderWidth: (borderWidth: number) => void;
    cardBorderColor: string;
    setCardBorderColor: (borderColor: string) => void;
    renderedCardContent: string;
    setRenderedCardContent: (renderedCardContent: string) => void;
}

export const TestimonialContentContext = createContext<TestimonialContentContextType | undefined>(undefined);

// @ts-ignore
export function TestimonialContentProvider({children}) {

    // Left sidebar
    const [username, setUsername] = useState("");
    const [usernameColor, setUsernameColor] = useState("");
    const [userFirm, setUserFirm] = useState("");
    const [userFirmLink, setUserFirmLink] = useState("");
    const [testimonialText, setTestimonialText] = useState("");
    const [separator, setSeparator] = useState("");
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | undefined>();
    const [imageBorderRadius, setImageBorderRadius] = useState<number>(0);

    // Right sidebar
    const [displayType, setDisplayType] = useState(DisplayTypeEnum.STYLE1);
    const [cardColor, setCardColor] = useState("#FFFFFF");
    const [cardBorderRadius, setCardBorderRadius] = useState<number>(0);
    const [cardShadow, setCardShadow] = useState<string>("");
    const [cardBorderWidth, setCardBorderWidth] = useState<number>(0);
    const [cardBorderColor, setCardBorderColor] = useState<string>("");

    const [renderedCardContent, setRenderedCardContent] = useState<string>("");

    return (
        <TestimonialContentContext.Provider value={{
            username,
            setUsername,
            usernameColor,
            setUsernameColor,
            userFirm,
            setUserFirm,
            testimonialText,
            setTestimonialText,
            separator,
            setSeparator,
            displayType,
            setDisplayType,
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
            cardBorderWidth,
            setCardBorderWidth,
            cardBorderColor,
            setCardBorderColor,
            renderedCardContent,
            setRenderedCardContent
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