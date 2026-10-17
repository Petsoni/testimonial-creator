import React from 'react';
import Image from "next/image";
import {AnimatePresence, motion, MotionConfig} from "motion/react";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {DisplayTypeEnum} from '@/lib/models/display-type.enum';
import {Skeleton} from '@/components/ui/skeleton';
import {spring} from "@/lib/motion";
import {translateBorderWidth} from "@/lib/utils";

// Both layouts place the same elements into different grid areas, so switching
// layouts moves each element to its new spot instead of swapping out the card.
const layoutGrids = {
    [DisplayTypeEnum.STYLE1]: {
        gridTemplateAreas: `"avatar text" "avatar meta"`,
        gridTemplateRows: "1fr auto",
        rowGap: "2rem",
    },
    [DisplayTypeEnum.STYLE2]: {
        gridTemplateAreas: `"avatar meta" "text text"`,
        gridTemplateRows: "auto 1fr",
        rowGap: "1rem",
    },
};

function TestimonialCard() {

    const {
        displayType, username, usernameColor, userFirm, userFirmLink, separator, testimonialText,
        profilePicturePreview, imageBorderRadius, cardColor, cardBorderRadius, cardShadow, cardBorderWidth,
        cardBorderColor,
    } = useTestimonialContent();

    const isSideBySide = displayType == DisplayTypeEnum.STYLE1;
    const hasMeta = username != '' || userFirm != '';

    // Only animate when the layout changes, so typing and other tweaks still apply instantly
    const layoutDependency = displayType;

    return (
        <MotionConfig transition={spring.layout}>
            <motion.div
                layout
                layoutDependency={layoutDependency}
                className={`card-default ${cardShadow} max-w-[90dvw] lg:max-w-[35rem]`}
                style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    columnGap: "1rem",
                    ...layoutGrids[displayType],
                    borderRadius: `${cardBorderRadius}px`,
                    background: cardColor,
                    borderStyle: "solid",
                    borderWidth: translateBorderWidth(cardBorderWidth),
                    borderColor: cardBorderColor,
                }}>
                <motion.div layout="position" layoutDependency={layoutDependency}
                            className="self-start"
                            style={{gridArea: "avatar"}}>
                    {profilePicturePreview ? (
                        <Image width={56} height={56}
                               className={`size-14 min-w-14 min-h-14 shrink-0 border-2 object-cover`}
                               style={{
                                   borderRadius: `${imageBorderRadius}px`,
                                   borderColor: cardBorderColor,
                               }}
                               src={profilePicturePreview}
                               alt={username + " profile image"}/>
                    ) : (
                        <Skeleton className="h-12 w-12 min-w-12 rounded-full"/>
                    )}
                </motion.div>

                <motion.div layout="position" layoutDependency={layoutDependency}
                            className="min-w-0"
                            style={{gridArea: "text"}}>
                    {testimonialText != ''
                        ? (
                            <p className={"wrap-break-word"}>{testimonialText}</p>
                        )
                        : (
                            <div className={"flex flex-col gap-2 w-full"}>
                                <Skeleton className={"w-full h-3"}/>
                                <Skeleton className={"w-full h-3"}/>
                                <Skeleton className={"w-full h-3"}/>
                            </div>
                        )
                    }
                </motion.div>

                {/* Side by side keeps name and company on one line, stacked puts them on two */}
                <motion.div layout="position" layoutDependency={layoutDependency}
                            className={`relative flex ${isSideBySide
                                ? `flex-row flex-wrap items-baseline ${hasMeta ? 'gap-x-1' : 'gap-2'}`
                                : 'flex-col items-start gap-2'}`}
                            style={{gridArea: "meta"}}>
                    {hasMeta ? (
                        <>
                            {username != '' && (
                                <motion.p layout="position" layoutDependency={layoutDependency}
                                          className={"bold-text"}
                                          style={{
                                              color: usernameColor
                                          }}>
                                    {username}
                                </motion.p>
                            )}
                            <AnimatePresence mode="popLayout" initial={false}>
                                {isSideBySide && username != '' && userFirm != '' && separator != '' && (
                                    <motion.span key="separator"
                                                 className={"text-[#454545]"}
                                                 initial={{opacity: 0}}
                                                 animate={{opacity: 1}}
                                                 exit={{opacity: 0}}>
                                        {separator}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            {userFirm != '' && (userFirmLink != ""
                                    ? (
                                        <motion.a layout="position" layoutDependency={layoutDependency}
                                                  href={userFirmLink} target={"_blank"}
                                                  style={{
                                                      textDecorationColor: usernameColor
                                                  }}
                                                  className={'underline text-[#454545]'}>
                                            {userFirm}
                                        </motion.a>
                                    ) : (
                                        <motion.span layout="position" layoutDependency={layoutDependency}
                                                     className={"text-[#454545]!"}>
                                            {userFirm}
                                        </motion.span>
                                    )
                            )}
                        </>
                    ) : (
                        <>
                            <motion.div layout="position" layoutDependency={layoutDependency}>
                                <Skeleton className={"w-40 h-3"}/>
                            </motion.div>
                            <motion.div layout="position" layoutDependency={layoutDependency}>
                                <Skeleton className={"w-20 h-3"}/>
                            </motion.div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </MotionConfig>
    );
}

export default TestimonialCard;
