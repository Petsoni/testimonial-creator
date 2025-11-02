"use client";

import React from 'react';
import {Button} from "@/components/ui/button";
import {motion} from 'motion/react';
import {fadeUpVariant} from "@/lib/variants";

function Page(props) {
    return (
        <div className={"landing-page h-screen flex flex-col items-center gap-10 justify-center"}>
            <div className="flex flex-col items-center justify-center gap-2">
                <motion.h1 initial={"initial"}
                           animate={"animate"}
                           variants={fadeUpVariant}
                           className={"w-3/5 landing-text text-center"}>
                    Create Stunning Testimonials Instantly
                </motion.h1>
                <motion.h6 initial={{
                    opacity: 0, y: 50, filter: "blur(5px)"
                }}
                           animate={{
                               opacity: 1, y: 0, filter: "blur(0px)",
                               transition: {
                                   delay: 0.15,
                               }
                           }}
                           className={"w-2/5 text-center text-gray-500"}>Create polished testimonial cards instantly and
                    showcase what customers really think
                </motion.h6>
            </div>
            <motion.div initial={{
                opacity: 0, y: 50, filter: "blur(5px)"
            }}
                        animate={{
                            opacity: 1, y: 0, filter: "blur(0px)",
                            transition: {
                                delay: 0.25,
                            }
                        }}
                        className="flex flex-row items-center justify-center gap-4">
                <a href="/builder">
                    <Button>
                        Create one now
                    </Button>
                </a>
            </motion.div>
        </div>
    );
}

export default Page;