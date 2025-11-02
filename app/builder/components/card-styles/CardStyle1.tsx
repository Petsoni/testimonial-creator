import React from 'react';
import {TestimonialContentContextType} from "@/context/TestimonialContentContext";
import {translateBorderWidth} from "@/lib/utils";
import {Skeleton} from '@/components/ui/skeleton';
import Image from "next/image";

function CardStyle1({cardProps}: { cardProps: Partial<TestimonialContentContextType> }) {
    return (
        <div
            className={`card-default flex flex-row gap-4 ${cardProps.cardShadow} max-w-[90dvw] lg:max-w-[35rem]`}
            style={{
                borderRadius: `${cardProps.cardBorderRadius}px`,
                background: cardProps.cardColor,
                borderStyle: "solid",
                borderWidth: translateBorderWidth(cardProps.cardBorderWidth!),
                borderColor: cardProps.cardBorderColor,
            }}>
            {cardProps.profilePicturePreview && cardProps.profilePicturePreview ? (
                <Image width={56} height={56}
                       className={`w-full border-2 max-w-14 object-cover h-14`}
                       style={{
                           borderRadius: `${cardProps.imageBorderRadius}px`,
                           borderColor: cardProps.cardBorderColor,
                       }}
                       src={cardProps.profilePicturePreview}
                       alt={cardProps.username + " profile image"}/>
            ) : (
                <Skeleton className="h-12 w-12 min-w-12 rounded-full"/>
            )}
            <div className="flex flex-col justify-between items-start w-full">
                {cardProps.testimonialText != ''
                    ? (
                        <p className={"mb-8 wrap-break-word"}>{cardProps.testimonialText}</p>
                    )
                    : (
                        <div className={"flex flex-col gap-2 w-full"}>
                            <Skeleton className={"w-full h-3"}/>
                            <Skeleton className={"w-full h-3"}/>
                            <Skeleton className={"w-full h-3"}/>
                        </div>
                    )
                }
                {/*<p className={"bold-text"}*/}
                {/*   style={{*/}
                {/*       color: cardProps.usernameColor*/}
                {/*   }}>*/}
                {/*    {cardProps.username}*/}
                {/*    <span className={"text-[#454545]"}> {cardProps.separator} </span>*/}
                {/*    {cardProps.userFirmLink != ""*/}
                {/*        ? (*/}
                {/*            <a href={cardProps.userFirmLink} target={"_blank"}*/}
                {/*               className={cardProps.userFirmLink != '' ? 'underline' : ''}>*/}
                {/*                {cardProps.userFirm}*/}
                {/*            </a>*/}
                {/*        ) : (*/}
                {/*            <span className={"text-[#454545]"}>*/}
                {/*                    {cardProps.userFirm}*/}
                {/*                </span>*/}
                {/*        )*/}
                {/*    }*/}
                {/*</p>*/}
                {cardProps.username != '' || cardProps.userFirm != '' ? (
                    <p className={"bold-text"}
                       style={{
                           color: cardProps.usernameColor
                       }}>
                        {cardProps.username}
                        <span className={"text-[#454545]"}> {cardProps.separator} </span>
                        {cardProps.userFirmLink != ""
                            ? (
                                <a href={cardProps.userFirmLink} target={"_blank"}
                                   style={{
                                       textDecorationColor: cardProps.usernameColor
                                   }}
                                   className={cardProps.userFirmLink != '' ? 'underline text-[#454545]' : ''}>
                                    {cardProps.userFirm}
                                </a>
                            ) : (
                                <span className={"text-[#454545]!"}>
                                    {cardProps.userFirm}
                                </span>
                            )
                        }
                    </p>
                ) : (
                    <div className={"flex flex-row gap-2"}>
                        <Skeleton className={"w-40 h-3"}/>
                        <Skeleton className={"w-20 h-3"}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CardStyle1;