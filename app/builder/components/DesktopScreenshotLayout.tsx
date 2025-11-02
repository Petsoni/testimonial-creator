"use client";

import React from 'react';
import TestimonialCard from "@/app/builder/components/TestimonialCard";
import {motion} from "motion/react";
import {fadeUpVariant} from "@/lib/variants";
import LeftSidebar from './left-sidebar/LeftSidebar';
import RightSidebar from './right-sidebar/RightSidebar';
import {Button} from "@/components/ui/button";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {captureScreenshot} from "@/lib/screenshot-service";
import {IconDownload} from "@tabler/icons-react";

function DesktopScreenshotLayout() {

    const {cardColor} = useTestimonialContent()

    return (
        <div className={"flex flex-row h-screen"}>
            <div className="w-1/3 lg:max-w-1/3 hidden lg:block">
                <LeftSidebar/>
            </div>
            <section className={"w-full flex flex-col items-center justify-between"} style={{
                background: `linear-gradient(135deg, oklch(from ${cardColor} calc(l - -1) c h) 25%, oklch(from ${cardColor} calc(l - 0.25) c h))`
            }}>
                <div></div>
                <div className="flex flex-col gap-6 items-center">
                    <motion.div
                        initial={"initial"}
                        animate={"animate"}
                        variants={fadeUpVariant}
                    >
                        <div id={'testimonialCardDiv'}>
                            <TestimonialCard/>
                        </div>
                    </motion.div>
                    <Button className={"w-fit"} onClick={() => captureScreenshot(cardColor)}>
                        <IconDownload/>
                        Download
                    </Button>
                </div>
                <p className={'text-sm mb-4'}>
                    Built with love by
                    <a className={'text-blue-600'} href="https://x.com/petsoni_" target={"_blank"}> Petsoni</a>
                </p>
            </section>
            <div className="w-1/3 lg:max-w-1/3 hidden lg:block">
                <RightSidebar/>
            </div>
        </div>
    );
}

export default DesktopScreenshotLayout;