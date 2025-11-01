import {Field, FieldLabel} from '@/components/ui/field';
import {BorderRadiusEnum} from '@/lib/models/border-radius.enum';
import React, {useState} from 'react';
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {
    IconBorderCornerIos,
    IconBorderCornerPill,
    IconBorderCornerRounded,
    IconBorderCornerSquare
} from "@tabler/icons-react";
import {Dropzone, DropzoneContent, DropzoneEmptyState} from '@/components/ui/shadcn-io/dropzone';
import {Slider} from '@/components/ui/slider';

function ProfilePictureInput() {
    const [files, setFiles] = useState<File[] | undefined>();

    const {
        profilePicturePreview,
        setProfilePicturePreview,
        imageBorderRadius,
        setImageBorderRadius
    } = useTestimonialContent();

    const borderRadiusIcon = (cardRadius: string) => {
        switch (cardRadius) {
            case BorderRadiusEnum.NONE:
                return <IconBorderCornerSquare/>
            case BorderRadiusEnum.SMALL:
                return <IconBorderCornerRounded/>
            case BorderRadiusEnum.MEDIUM:
                return <IconBorderCornerIos/>
            case BorderRadiusEnum.FULL:
                return <IconBorderCornerPill/>
        }
    }

    const handleDrop = (files: File[]) => {
        setFiles(files);
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (typeof e.target?.result === 'string') {
                    setProfilePicturePreview(e.target?.result);
                    localStorage.setItem("profileImageBlob", e.target.result);
                }
            };
            reader.readAsDataURL(files[0]);
        }
    };

    return (
        <Field className="mb-4">
            <FieldLabel>Profile picture</FieldLabel>
            <Dropzone
                accept={{'image/*': []}}
                maxFiles={10}
                maxSize={1024 * 1024 * 10}
                minSize={1024}
                onDrop={handleDrop}
                onError={console.error}
                src={files}
                className={"mb-2"}
            >
                <DropzoneEmptyState/>
                <DropzoneContent/>
            </Dropzone>
            {profilePicturePreview && (
                <Field className="mt-4">
                    <FieldLabel htmlFor="profilePictureBorderRadius">Border radius</FieldLabel>
                    <Slider defaultValue={[0]}
                            id="profilePictureBorderRadius"
                            className={"my-2 cursor-pointer"}
                            step={1}
                            min={0}
                            max={30} onValueChange={(value) => {
                        setImageBorderRadius(value[0]);
                    }}/>
                    <p>{imageBorderRadius}px</p>
                </Field>
            )}
        </Field>
    );
}

export default ProfilePictureInput;