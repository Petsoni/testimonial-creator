// The user picks a backdrop; the card never takes that colour. It stays a
// near-white tint of it, so card text holds AAA contrast on every option.

export type Backdrop = {
    id: string;
    name: string;
    /** Top-left of the gradient. */
    from: string;
    /** Bottom-right of the gradient; the colour the card is tinted with. */
    to: string;
    /** Deep shade of the hue for the name, at least 4.5:1 on the tinted card. */
    accent: string;
    dark?: boolean;
};

export type NameTone = "ink" | "accent";

// Muted on purpose. Checked: card text is at least 7.9:1 and the accent at least 6.1:1 on every tint.
export const BACKDROPS: Backdrop[] = [
    {id: "cloud", name: "Cloud", from: "#F3F4F6", to: "#C9CED6", accent: "#374151"},
    {id: "sky", name: "Sky", from: "#EEF5FC", to: "#A9C8EA", accent: "#1E4E8C"},
    {id: "lavender", name: "Lavender", from: "#F3F1FC", to: "#C3B8EC", accent: "#4B3A9C"},
    {id: "blush", name: "Blush", from: "#FCF1F3", to: "#E9B9C5", accent: "#9A2A48"},
    {id: "peach", name: "Peach", from: "#FDF3EC", to: "#EFC3A3", accent: "#96400F"},
    {id: "sage", name: "Sage", from: "#F0F7F2", to: "#B5D5BF", accent: "#2E6A44"},
    {id: "sand", name: "Sand", from: "#FBF7EC", to: "#E0D2A9", accent: "#765A14"},
    {id: "graphite", name: "Graphite", from: "#5B6270", to: "#2B303A", accent: "#1F2937", dark: true},
];

export const DEFAULT_BACKDROP = BACKDROPS[0];

export function findBackdrop(id: string) {
    return BACKDROPS.find((backdrop) => backdrop.id === id) ?? DEFAULT_BACKDROP;
}

function mix(a: string, b: string, amount: number) {
    const channels = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    const [ca, cb] = [channels(a), channels(b)];
    return `#${ca
        .map((value, i) => Math.round(value * (1 - amount) + cb[i] * amount).toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase()}`;
}

/** The card: white with a tenth of the backdrop mixed in. */
export const cardTint = (backdrop: Backdrop) => mix("#FFFFFF", backdrop.to, 0.1);

export const borderTint = (backdrop: Backdrop) => mix("#FFFFFF", backdrop.to, backdrop.dark ? 0.25 : 0.45);

export const backdropGradient = (backdrop: Backdrop) =>
    `linear-gradient(135deg, ${backdrop.from} 20%, ${backdrop.to} 100%)`;

/** Empty string lets the card's default ink colour through. */
export const nameColor = (backdrop: Backdrop, tone: NameTone) => (tone === "accent" ? backdrop.accent : "");
