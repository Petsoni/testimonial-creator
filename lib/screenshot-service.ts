import html2canvas from "html2canvas-pro";
import {cardCanvasBackground} from "@/lib/utils";

export function captureScreenshot(cardColor: string, username: string, userFirm: string) {
    const original = document.getElementById("testimonialCardDiv");
    const clone = original.cloneNode(true);

    const captureDiv = document.createElement("div");
    const watermark = document.createElement("h6");
    captureDiv.id = "captureScreenshot";
    captureDiv.className = "capture-screenshot";
    captureDiv.style.background = cardCanvasBackground(cardColor);

    /* todo Watermark for free versions (implement when payment is added)
        watermark.innerHTML = "Free version of Testimonial Creator";
        watermark.className = "watermark";
        captureDiv.appendChild(watermark);
    */

    captureDiv.appendChild(clone);
    document.body.appendChild(captureDiv);

    html2canvas(captureDiv, {
        useCORS: true,
        scale: 1.25,
    }).then((canvas) => {
        const link = document.createElement("a");
        const screenshotName = `${username}${userFirm != '' ? '-' + userFirm : ''}-easytestimonial`;
        link.download = `${screenshotName}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        captureDiv.remove();
    });
}

export function actionBasedOnButton(action: "PREVIEW" | "DOWNLOAD", canvas: HTMLCanvasElement, captureDiv?: HTMLDivElement) {
    switch (action) {
        case "DOWNLOAD":
            const link = document.createElement("a");
            link.download = "screenshot.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
            captureDiv.remove();
            break;
        case "PREVIEW":
            captureDiv.appendChild(canvas);
            break;

    }
}
