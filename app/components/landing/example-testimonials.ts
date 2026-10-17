import {createAvatar} from "@dicebear/core";
import {notionists} from "@dicebear/collection";
import {DisplayTypeEnum} from "@/lib/models/display-type.enum";
import {CardShadowEnum} from "@/lib/models/card-shadow.enum";
import type {NameTone} from "@/lib/backdrops";

/** The builder's design choices for one card, as plain data so it can cross into client components. */
export type ExampleTestimonial = {
    displayType: DisplayTypeEnum;
    username: string;
    userFirm: string;
    separator: string;
    testimonialText: string;
    profilePicturePreview: string;
    imageBorderRadius: number;
    backdropId: string;
    nameTone: NameTone;
    cardBorderRadius: number;
    cardShadow: string;
    cardBorderWidth: number;
};

// The studio using EasyTestimonial in the landing page scenes.
export const exampleStudio = {
    name: "Harbor & Pine",
    initials: "HP",
    handle: "@harborandpine",
    domain: "harborandpine.example",
};

/** The builder's default avatar style for people without a photo, seeded by name so it never changes. */
function avatar(seed: string, backgroundColor: string) {
    return createAvatar(notionists, {seed, backgroundColor: [backgroundColor]}).toDataUri();
}

export const exampleTestimonials = {
    ingrid: {
        displayType: DisplayTypeEnum.STYLE1,
        username: "Ingrid Solberg",
        userFirm: "Hearth & Co.",
        separator: "·",
        testimonialText: "Our bookings doubled the month the new site went live. I still get compliments on it.",
        profilePicturePreview: avatar("Ingrid Solberg", "b6e3f4"),
        imageBorderRadius: 28,
        backdropId: "sky",
        nameTone: "accent",
        cardBorderRadius: 12,
        cardShadow: CardShadowEnum.MEDIUM,
        cardBorderWidth: 0,
    },
    daniel: {
        displayType: DisplayTypeEnum.STYLE2,
        username: "Daniel Reyes",
        userFirm: "Fieldnote",
        separator: "",
        testimonialText: "Clear estimates, zero surprises, and a launch that landed on the exact date we planned.",
        profilePicturePreview: avatar("Daniel Reyes", "d1d4f9"),
        imageBorderRadius: 28,
        backdropId: "sage",
        nameTone: "accent",
        cardBorderRadius: 24,
        cardShadow: CardShadowEnum.MEDIUM,
        cardBorderWidth: 2,
    },
    maya: {
        displayType: DisplayTypeEnum.STYLE1,
        username: "Maya Okafor",
        userFirm: "Northwind Studio",
        separator: "·",
        testimonialText: "They rebuilt our onboarding in two weeks. Activation went from 31% to 48%, and support tickets dropped by half.",
        profilePicturePreview: avatar("Maya Okafor", "ffdfbf"),
        imageBorderRadius: 28,
        backdropId: "peach",
        nameTone: "accent",
        cardBorderRadius: 16,
        cardShadow: CardShadowEnum.LARGE,
        cardBorderWidth: 1,
    },
    lucia: {
        displayType: DisplayTypeEnum.STYLE1,
        username: "Lucía Ferrer",
        userFirm: "Café Ortiga",
        separator: "—",
        testimonialText: "Warm, quick, and genuinely invested in our little café. We'd hire them again tomorrow.",
        profilePicturePreview: avatar("Lucía Ferrer", "ffd5dc"),
        imageBorderRadius: 28,
        backdropId: "blush",
        nameTone: "accent",
        cardBorderRadius: 20,
        cardShadow: CardShadowEnum.SMALL,
        cardBorderWidth: 1,
    },
} satisfies Record<string, ExampleTestimonial>;
