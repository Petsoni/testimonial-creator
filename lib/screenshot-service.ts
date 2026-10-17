import html2canvas from "html2canvas-pro";

/** Side of the square the PNG is cut from, in CSS pixels. Matches `.capture-screenshot`. */
export const ARTBOARD_SIZE = 768;
export const EXPORT_SCALE = 2;

export function screenshotFileName(username: string, userFirm: string) {
    const slug = [username, userFirm]
        .map((part) => part.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""))
        .filter(Boolean)
        .join("-");
    return `${slug || "testimonial"}-easytestimonial.png`;
}

/**
 * Renders the card on a square artboard and downloads it as a PNG.
 * Resolves once the download is handed to the browser; rejects if rendering fails.
 */
export async function captureScreenshot({background, username, userFirm}: {
    /** The artboard's CSS background, so the PNG matches the preview. */
    background: string;
    username: string;
    userFirm: string;
}) {
    const original = document.getElementById("testimonialCardDiv");
    if (!original) {
        throw new Error("Could not find the testimonial card to export.");
    }

    const clone = original.cloneNode(true) as HTMLElement;
    // Placeholders belong to the editor, never to the exported image.
    clone.querySelectorAll('[data-slot="skeleton"]').forEach((placeholder) => placeholder.remove());

    const captureDiv = document.createElement("div");
    captureDiv.className = "capture-screenshot";
    captureDiv.setAttribute("aria-hidden", "true");
    captureDiv.style.background = background;
    // Rendered off-screen so the page doesn't jump while the PNG is drawn.
    captureDiv.style.position = "fixed";
    captureDiv.style.top = "0";
    captureDiv.style.left = "-100000px";

    /* todo Watermark for free versions (implement when payment is added)
        const watermark = document.createElement("h6");
        watermark.innerHTML = "Free version of Testimonial Creator";
        watermark.className = "watermark";
        captureDiv.appendChild(watermark);
    */

    captureDiv.appendChild(clone);
    document.body.appendChild(captureDiv);

    try {
        const canvas = await html2canvas(captureDiv, {useCORS: true, scale: EXPORT_SCALE, logging: false});
        const link = document.createElement("a");
        link.download = screenshotFileName(username, userFirm);
        link.href = canvas.toDataURL("image/png");
        link.click();
    } finally {
        captureDiv.remove();
    }
}
