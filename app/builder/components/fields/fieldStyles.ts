// Shared text styles for builder fields, in the Wireframe system's voice: mono labels, mono readouts.
export const labelClass = "font-mono text-[11px] leading-5 font-medium uppercase tracking-[0.05em] text-ink-2";
// Sits inside a mono label ("Company optional"), so it drops the caps and tracking.
export const labelHintClass = "text-[11px] font-normal normal-case tracking-normal text-muted-foreground";
export const hintClass = "text-xs leading-snug text-muted-foreground";
export const readoutClass = "font-mono text-[11px] tracking-[0.02em] text-muted-foreground tabular-nums";
export const groupTitleClass = "font-mono text-[11px] leading-4 font-medium uppercase tracking-[0.08em] text-foreground";
// Fields stacked in a group, each on its own ruled row.
export const ruledRowsClass = "flex flex-col gap-3.5 [&>*+*]:border-t [&>*+*]:border-rule-soft [&>*+*]:pt-3.5";
