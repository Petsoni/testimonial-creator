"use client";

import React from 'react';
import TestimonialCard from "@/app/builder/components/TestimonialCard";
import {motion} from "motion/react";
import {fadeUpVariant} from "@/lib/variants";
import LeftSidebar from './left-sidebar/LeftSidebar';
import RightSidebar from './right-sidebar/RightSidebar';
import {Button} from "@/components/ui/button";
import html2canvas from "html2canvas-pro";
import {useTestimonialContent} from "@/context/TestimonialContentContext";

function DesktopScreenshotLayout() {

    const {cardBorderColor} = useTestimonialContent()

    function captureScreenshot() {
        const original = document.getElementById("testimonialCardDiv");
        const clone = original.cloneNode(true); // kopija elementa

        const captureDiv = document.createElement("div");
        const watermark = document.createElement("h6");
        captureDiv.id = "captureScreenshot";
        captureDiv.className = "capture-screenshot";
        captureDiv.style.background = `linear-gradient(45deg, ${cardBorderColor}, oklch(from ${cardBorderColor} calc(l - .3) c h))`;
        watermark.innerHTML = "Free version of Testimonial Creator";
        watermark.className = "watermark";
        captureDiv.appendChild(watermark);
        captureDiv.appendChild(clone);

        document.body.appendChild(captureDiv);

        html2canvas(captureDiv, {
            useCORS: true,
            backgroundColor: "#ffffff",
            scale: 1.25,
        }).then((canvas) => {
            const link = document.createElement("a");
            link.download = "screenshot.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
            captureDiv.remove();
        });
    }

    return (
        <div className={"flex flex-row h-screen"}>
            <div className="w-1/3 lg:max-w-1/3 hidden lg:block">
                <LeftSidebar/>
            </div>
            <section className={"w-full flex flex-col items-center justify-between"}>
                <div></div>
                <motion.div
                    initial={"initial"}
                    animate={"animate"}
                    variants={fadeUpVariant}
                >
                    <div id={'testimonialCardDiv'}>
                        <TestimonialCard/>
                    </div>
                </motion.div>
                <Button onClick={() => captureScreenshot()}>Save</Button>
                <p className={'text-sm mb-4'}>
                    Built with love by
                    <a className={'text-blue-600'} href="https://x.com/petsoni_"> Petsoni</a>
                </p>
            </section>
            <div className="w-1/3 lg:max-w-1/3 hidden lg:block">
                <RightSidebar/>
            </div>
        </div>
    );
}

export default DesktopScreenshotLayout;