import React from 'react';
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import Image from "next/image";

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
    } = useTestimonialContent();

    return (
        <div className={`flex flex-row gap-4 ${cardShadow} max-w-[40rem] min-w-[25rem] min-h-[10rem] p-8 ${cardBorderRadius}`}
             style={{background: cardColor}}>
            {profilePicturePreview &&
                <Image width={56} height={56}
                       className={`w-full border-2 max-w-14 object-cover h-14 ${imageBorderRadius}`}
                       src={profilePicturePreview}
                       alt={username + " profile image"}/>
            }
            <div className="flex flex-col justify-between items-start">
                <p className={"mb-8"}>{testimonialText}</p>
                <p className={"bold-text"}>{username} {separator + " "}
                    <a href={userFirmLink} target={"_blank"} className={userFirmLink ? 'underline' : ''}>
                        {userFirm}
                    </a>
                </p>
            </div>
        </div>
    );
}

export default TestimonialCard;