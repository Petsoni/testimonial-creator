import type {TestimonialContentContextType} from "@/context/TestimonialContentContext";
import {DisplayTypeEnum} from "@/lib/models/display-type.enum";
import {CardShadowEnum} from "@/lib/models/card-shadow.enum";

export type ExampleTestimonial = Pick<TestimonialContentContextType,
    "displayType" | "username" | "usernameColor" | "userFirm" | "userFirmLink" | "separator" | "testimonialText" |
    "profilePicturePreview" | "imageBorderRadius" | "cardColor" | "cardBorderRadius" | "cardShadow" |
    "cardBorderWidth" | "cardBorderColor">;

// The studio using EasyTestimonial in the landing page scenes.
export const exampleStudio = {
    name: "Harbor & Pine",
    initials: "HP",
    handle: "@harborandpine",
    domain: "harborandpine.example",
};

/** An initials avatar as a data URI, so next/image renders it without remote image config. */
function initialsAvatar(name: string, background: string, foreground: string) {
    const initials = name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();
    const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112">` +
        `<rect width="112" height="112" fill="${background}"/>` +
        `<text x="56" y="56" dy=".36em" text-anchor="middle" fill="${foreground}" ` +
        `font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif" font-size="42" font-weight="600">` +
        `${initials}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const exampleTestimonials = {
    ingrid: {
        displayType: DisplayTypeEnum.STYLE1,
        username: "Ingrid Solberg",
        usernameColor: "#1D4ED8",
        userFirm: "Hearth & Co.",
        userFirmLink: "",
        separator: "·",
        testimonialText: "Our bookings doubled the month the new site went live. I still get compliments on it.",
        profilePicturePreview: initialsAvatar("Ingrid Solberg", "#BFDBFE", "#1D4ED8"),
        imageBorderRadius: 12,
        cardColor: "#EFF6FF",
        cardBorderRadius: 12,
        cardShadow: CardShadowEnum.MEDIUM,
        cardBorderWidth: 0,
        cardBorderColor: "",
    },
    daniel: {
        displayType: DisplayTypeEnum.STYLE2,
        username: "Daniel Reyes",
        usernameColor: "#15803D",
        userFirm: "Fieldnote",
        userFirmLink: "",
        separator: "",
        testimonialText: "Clear estimates, zero surprises, and a launch that landed on the exact date we planned.",
        profilePicturePreview: initialsAvatar("Daniel Reyes", "#BBF7D0", "#15803D"),
        imageBorderRadius: 28,
        cardColor: "#F0FDF4",
        cardBorderRadius: 24,
        cardShadow: CardShadowEnum.MEDIUM,
        cardBorderWidth: 2,
        cardBorderColor: "#86EFAC",
    },
    maya: {
        displayType: DisplayTypeEnum.STYLE1,
        username: "Maya Okafor",
        usernameColor: "#B45309",
        userFirm: "Northwind Studio",
        userFirmLink: "",
        separator: "·",
        testimonialText: "They rebuilt our onboarding in two weeks. Activation went from 31% to 48%, and support tickets dropped by half.",
        profilePicturePreview: initialsAvatar("Maya Okafor", "#FED7AA", "#B45309"),
        imageBorderRadius: 28,
        cardColor: "#FFF7ED",
        cardBorderRadius: 16,
        cardShadow: CardShadowEnum.LARGE,
        cardBorderWidth: 1,
        cardBorderColor: "#FED7AA",
    },
    lucia: {
        displayType: DisplayTypeEnum.STYLE1,
        username: "Lucía Ferrer",
        usernameColor: "#B91C1C",
        userFirm: "Café Ortiga",
        userFirmLink: "",
        separator: "—",
        testimonialText: "Warm, quick, and genuinely invested in our little café. We'd hire them again tomorrow.",
        profilePicturePreview: initialsAvatar("Lucía Ferrer", "#FECACA", "#B91C1C"),
        imageBorderRadius: 28,
        cardColor: "#FEF2F2",
        cardBorderRadius: 20,
        cardShadow: CardShadowEnum.SMALL,
        cardBorderWidth: 1,
        cardBorderColor: "#FECACA",
    },
} satisfies Record<string, ExampleTestimonial>;
