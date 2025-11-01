"use client";

import React from 'react';
import TestimonialCard from "@/app/(builder)/components/TestimonialCard";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {IconCode, IconEye} from "@tabler/icons-react";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import TestimonialCardCode from "@/app/(builder)/components/TestimonialCardCode";
import {CopyButton} from "@/components/ui/shadcn-io/copy-button";
import {motion} from "motion/react";
import {fadeUpVariant} from "@/lib/variants";
import LeftSidebar from './left-sidebar/LeftSidebar';
import RightSidebar from './right-sidebar/RightSidebar';

function DesktopLayout() {

    const {setProfilePicturePreview, renderedCardContent} = useTestimonialContent()

    return (
        <div className={"flex flex-row w-full h-screen"}>
            <div className="max-w-1/3 lg:max-w-1/4 hidden lg:block">
                <LeftSidebar/>
            </div>
            <section className={"w-full flex flex-col items-center justify-between"}>
                <div></div>
                <Tabs className={"lg:min-w-[40rem]"} defaultValue={"preview"} onValueChange={(value) => {
                    if (value == 'code') {
                        setProfilePicturePreview("URL here");
                    } else {
                        setProfilePicturePreview(localStorage.getItem("profileImageBlob")!);
                    }
                }}>
                    <TabsList>
                        <TabsTrigger value="preview">
                            <IconEye/>
                            Preview
                        </TabsTrigger>
                        <TabsTrigger value="code">
                            <IconCode/>
                            Code
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value={"preview"}>
                        <motion.div
                            initial={"initial"}
                            animate={"animate"}
                            variants={fadeUpVariant}
                        >
                            <TestimonialCard/>
                        </motion.div>
                    </TabsContent>
                    <TabsContent value={"code"}>
                        <motion.pre
                            initial={"initial"}
                            animate={"animate"}
                            variants={fadeUpVariant}
                            className={"relative rounded-lg border-2 border-gray-200 shadow-xl clip max-w-[40rem] max-h-[80dvh] wrap-anywhere bg-white p-8 font-mono! text-[12px] overflow-scroll"}>
                            <TestimonialCardCode/>
                            <CopyButton className={"absolute top-2 right-1"} content={renderedCardContent}/>
                        </motion.pre>
                    </TabsContent>
                </Tabs>
                <p className={'text-sm mb-4'}>
                    Built with love by
                    <a className={'text-blue-600'} href="https://x.com/petsoni_"> Petsoni</a>
                </p>
            </section>
            <div className="max-w-1/4 hidden lg:block">
                <RightSidebar/>
            </div>
        </div>
    );
}

export default DesktopLayout;