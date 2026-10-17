// Motion values for the builder. Every entrance uses ease.out and stays within 150–250ms.

export const ease = {
    out: [0.23, 1, 0.32, 1] as const,
};

export const duration = {
    fast: 0.15,
    base: 0.2,
    slow: 0.25,
};

export const spring = {
    // Shared-layout indicators: the selected swatch, the active dock tool.
    snappy: {type: "spring", stiffness: 520, damping: 40, mass: 0.8} as const,
};

export const fadeUp = {
    initial: {opacity: 0, y: 8},
    animate: {opacity: 1, y: 0},
};

export const stagger = (step: number, delay = 0) => ({
    animate: {transition: {staggerChildren: step, delayChildren: delay}},
});
