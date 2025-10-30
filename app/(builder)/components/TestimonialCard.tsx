import React from 'react';
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {Skeleton} from "@/components/ui/skeleton";

function TestimonialCard() {
    const {
        username,
        testimonialText,
        userFirm,
        userFirmLink,
        separator,
        cardStyle,
        profilePicturePreview,
        imageBorderRadius,
        cardColor,
        cardBorderRadius,
        cardShadow,
        cardBorderWidth,
        cardBorderColor
    } = useTestimonialContent();

    const translateBorderWidth = (borderWidth: number) => {
        return `${borderWidth}px`;
    }

    return (
        <div
            className={`flex flex-row gap-4 ${cardShadow} max-w-[40rem] min-w-[30rem] min-h-[10rem] p-8 ${cardBorderRadius}`}
            style={{
                background: cardColor,
                borderStyle: "solid",
                borderWidth: translateBorderWidth(cardBorderWidth),
                borderColor: cardBorderColor,
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
                 className={`w-full border-2 max-w-14 object-cover h-14 ${imageBorderRadius}`}
                 src={"https://img.freepik.com/free-psd/3d-rendering-religion-icon_23-2151009388.jpg?semt=ais_hybrid&w=740&q=80"}
                 alt={username + " profile image"}/>
            <div className="flex flex-col justify-between items-start">
                {testimonialText != ''
                    ? (
                        <p className={"mb-8 wrap-break-word"}>{testimonialText}</p>
                    )
                    : (
                        <div className={"flex flex-col gap-2"}>
                            <Skeleton className={"w-100 h-3"}/>
                            <Skeleton className={"w-100 h-3"}/>
                            <Skeleton className={"w-100 h-3"}/>
                        </div>
                    )
                }

                {username != '' ? (
                    <p className={"bold-text"}>{username} {separator + " "}
                        <a href={userFirmLink} target={"_blank"} className={userFirmLink ? 'underline' : ''}>
                            {userFirm}
                        </a>
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

export default TestimonialCard;