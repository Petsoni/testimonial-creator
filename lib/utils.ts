import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/** The gradient behind the card in the builder canvas and the exported PNG, derived from the card color. */
export function cardCanvasBackground(cardColor: string) {
    return `linear-gradient(135deg, oklch(from ${cardColor} calc(l - -1) c h) 25%, oklch(from ${cardColor} calc(l - 0.25) c h))`;
}

export const translateBorderWidth = (borderWidth: number) => {
    return `${borderWidth}px`;
}

export function renderCardStyle(fn, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}