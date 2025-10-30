import React from 'react';
import {TestimonialContentContextType} from "@/context/TestimonialContentContext";
import {Skeleton} from '@/components/ui/skeleton';
import {translateBorderWidth} from "@/lib/utils";

function CardStyle1({cardProps}: { cardProps: Partial<TestimonialContentContextType> }) {
    return (
        <div
            className={`flex flex-row gap-4 ${cardProps.cardShadow} max-w-[35rem] min-w-[30rem] min-h-[10rem] p-6 ${cardProps.cardBorderRadius}`}
            style={{
                background: cardProps.cardColor,
                borderStyle: "solid",
                borderWidth: translateBorderWidth(cardProps.cardBorderWidth!),
                borderColor: cardProps.cardBorderColor,
            }}>
            {/*{profilePicturePreview && profilePicturePreview !== 'URL here' ? (*/}
            {/*    <Image width={56} height={56}*/}
            {/*           className={`w-full border-2 max-w-14 object-cover h-14 ${imageBorderRadius}`}*/}
            {/*           src={profilePicturePreview}*/}
            {/*           alt={username + " profile image"}/>*/}
            {/*) : (*/}
            {/*    <Skeleton className="h-12 w-12 min-w-12 rounded-full"/>*/}
            {/*)}*/}
            <img width={56} height={56}
                 className={`w-full border-2 max-w-14 object-cover h-14 ${cardProps.imageBorderRadius}`}
                 src={"https://img.freepik.com/free-psd/3d-rendering-religion-icon_23-2151009388.jpg?semt=ais_hybrid&w=740&q=80"}
                 alt={cardProps.username + " profile image"}/>
            <div className="flex flex-col justify-between items-start">
                {cardProps.testimonialText != ''
                    ? (
                        <p className={"mb-8 wrap-break-word"}>{cardProps.testimonialText}</p>
                    )
                    : (
                        <div className={"flex flex-col gap-2"}>
                            <Skeleton className={"w-100 h-3"}/>
                            <Skeleton className={"w-100 h-3"}/>
                            <Skeleton className={"w-100 h-3"}/>
                        </div>
                    )
                }

                {cardProps.username != '' || cardProps.userFirm != '' ? (
                    <p className={"bold-text"}
                       style={{
                           color: cardProps.usernameColor
                       }}>
                        {cardProps.username}
                        <span className={"text-[#454545]"}>{" " + cardProps.separator + " "}</span>
                        {cardProps.userFirmLink != ""
                            ? (
                                <a href={cardProps.userFirmLink} target={"_blank"}
                                   className={cardProps.userFirmLink != '' ? 'underline' : ''}>
                                    {cardProps.userFirm}
                                </a>
                            ) : (
                                <span className={"text-[#454545]"}>
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