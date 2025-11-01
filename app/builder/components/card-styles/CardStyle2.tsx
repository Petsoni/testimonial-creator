import React from 'react';
import {TestimonialContentContextType} from "@/context/TestimonialContentContext";
import {translateBorderWidth} from "@/lib/utils";
import Image from "next/image";
import {Skeleton} from "@/components/ui/skeleton";

function CardStyle2({cardProps}: { cardProps: Partial<TestimonialContentContextType> }) {
    return (
        <div
            className={`flex flex-col gap-4 ${cardProps.cardShadow} max-w-[35rem] min-w-[30rem] min-h-[10rem] p-6 ${cardProps.cardBorderRadius}`}
            style={{
                borderRadius: `${cardProps.cardBorderRadius}px`,
                background: cardProps.cardColor,
                borderStyle: "solid",
                borderWidth: translateBorderWidth(cardProps.cardBorderWidth!),
                borderColor: cardProps.cardBorderColor,
            }}>
            <div className="flex flex-row gap-4">
                {cardProps.profilePicturePreview ? (
                    <Image width={56} height={56}
                           style={{
                               borderRadius: `${cardProps.imageBorderRadius}px`,
                           }}
                           className={`w-full border-2 max-w-14 object-cover h-14`}
                           src={cardProps.profilePicturePreview}
                           alt={cardProps.username + " profile image"}/>
                ) : (
                    <Skeleton className="h-12 w-12 min-w-12 rounded-full"/>
                )}
                {cardProps.username != '' || cardProps.userFirm != '' ? (
                    <div className="flex flex-col gap-2">
                        <p className={"bold-text"} style={{
                            color: cardProps.usernameColor
                        }}>{cardProps.username} {cardProps.separator + " "}</p>
                        <a href={cardProps.userFirmLink} target={"_blank"}
                           className={cardProps.userFirmLink != '' ? 'underline' : ''}>
                            {cardProps.userFirm}
                        </a>
                    </div>
                ) : (
                    <div className={"flex flex-col gap-2"}>
                        <Skeleton className={"w-40 h-3"}/>
                        <Skeleton className={"w-20 h-3"}/>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-start">
                {cardProps.testimonialText != ''
                    ? (
                        <p className={"wrap-break-word"}>{cardProps.testimonialText}</p>
                    )
                    : (
                        <div className={"flex flex-col w-full gap-2"}>
                            <Skeleton className={"w-full h-3"}/>
                            <Skeleton className={"w-full h-3"}/>
                            <Skeleton className={"w-full h-3"}/>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default CardStyle2;