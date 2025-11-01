import React from 'react';
import {TestimonialContentContextType} from "@/context/TestimonialContentContext";
import {translateBorderWidth} from "@/lib/utils";

function CardStyle2({cardProps}: { cardProps: Partial<TestimonialContentContextType> }) {
    return (
        <div
            className={`flex flex-col gap-4 ${cardProps.cardShadow} max-w-[35rem] min-w-[30rem] min-h-[10rem] p-6 ${cardProps.cardBorderRadius}`}
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
            <div className="flex flex-row gap-2">
                <img width={56} height={56}
                     className={`w-full border-2 max-w-14 object-cover h-14 ${cardProps.imageBorderRadius}`}
                     src={"petsoni-profile.webp"}
                     alt={cardProps.username + " profile image"}/>
                <div className="flex flex-col gap-2">
                    <p className={"bold-text"} style={{
                        color: cardProps.usernameColor
                    }}>{cardProps.username} {cardProps.separator + " "}</p>
                    <a href={cardProps.userFirmLink} target={"_blank"}
                       className={cardProps.userFirmLink != '' ? 'underline' : ''}>
                        {cardProps.userFirm}
                    </a>
                </div>
                {/*{cardProps.username != '' || cardProps.userFirm != '' ? (*/}
                {/*    <div className="flex flex-col gap-2">*/}
                {/*        <p className={"bold-text"} style={{*/}
                {/*            color: cardProps.usernameColor*/}
                {/*        }}>{cardProps.username} {cardProps.separator + " "}</p>*/}
                {/*        <a href={cardProps.userFirmLink} target={"_blank"}*/}
                {/*           className={cardProps.userFirmLink != '' ? 'underline' : ''}>*/}
                {/*            {cardProps.userFirm}*/}
                {/*        </a>*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <div className={"flex flex-col gap-2"}>*/}
                {/*        <Skeleton className={"w-40 h-3"}/>*/}
                {/*        <Skeleton className={"w-20 h-3"}/>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
            <div className="flex flex-col items-start">
                <p className={"wrap-break-word"}>{cardProps.testimonialText}</p>
                {/*{cardProps.testimonialText != ''*/}
                {/*    ? (*/}
                {/*        <p className={"wrap-break-word"}>{cardProps.testimonialText}</p>*/}
                {/*    )*/}
                {/*    : (*/}
                {/*        <div className={"flex flex-col gap-2"}>*/}
                {/*            <Skeleton className={"w-100 h-3"}/>*/}
                {/*            <Skeleton className={"w-100 h-3"}/>*/}
                {/*            <Skeleton className={"w-100 h-3"}/>*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*}*/}
            </div>
        </div>
    );
}

export default CardStyle2;