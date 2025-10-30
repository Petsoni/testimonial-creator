"use client";

import LeftSidebar from "@/app/(builder)/components/LeftSidebar";
import RightSidebar from "@/app/(builder)/components/RightSidebar";
import TestimonialCard from "@/app/(builder)/components/TestimonialCard";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {IconCode, IconEye} from "@tabler/icons-react";
import reactElementToJSXString from 'react-element-to-jsx-string';
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {PrismLight as SyntaxHighlighterConfig} from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';

export default function Home() {

    const {setProfilePicturePreview} = useTestimonialContent()

    SyntaxHighlighterConfig.registerLanguage("jsx", jsx)

    return (
        <main className={"flex flex-row w-full h-screen"}>
            <LeftSidebar/>
            <section className={"w-full flex items-center justify-center"}>
                <Tabs className={"min-w-[40rem]"} defaultValue={"preview"} onValueChange={(value) => {
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
                        <TestimonialCard/>
                    </TabsContent>
                    <TabsContent value={"code"}>
                        <pre
                            className={"rounded-lg border-2 border-gray-500 clip max-w-[40rem] max-h-[80dvh] wrap-anywhere bg-white p-8 font-mono! text-[12px] overflow-scroll"}>
                            {reactElementToJSXString(TestimonialCard())}
                            </pre>
                    </TabsContent>
                </Tabs>
            </section>
            <RightSidebar/>
        </main>
    );
}
