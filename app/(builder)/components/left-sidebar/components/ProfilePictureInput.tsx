import {Field, FieldLabel} from '@/components/ui/field';
import {Choicebox, ChoiceboxItem, ChoiceboxItemDescription} from '@/components/ui/shadcn-io/choicebox';
import {BorderRadiusEnum} from '@/lib/models/border-radius.enum';
import React, {useState} from 'react';
import {useTestimonialContent} from "@/context/TestimonialContentContext";

function ProfilePictureInput() {
    const [files, setFiles] = useState<File[] | undefined>();

    const {setProfilePicturePreview, setImageBorderRadius} = useTestimonialContent();

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
            {/*<Dropzone*/}
            {/*    accept={{'image/*': []}}*/}
            {/*    maxFiles={10}*/}
            {/*    maxSize={1024 * 1024 * 10}*/}
            {/*    minSize={1024}*/}
            {/*    onDrop={handleDrop}*/}
            {/*    onError={console.error}*/}
            {/*    src={files}*/}
            {/*    className={"mb-2"}*/}
            {/*>*/}
            {/*    <DropzoneEmptyState/>*/}
            {/*    <DropzoneContent/>*/}
            {/*</Dropzone>*/}
            {/*{profilePicturePreview && (*/}
            {/*    <Choicebox defaultValue="2xl" className={"flex flex-row w-full"}>*/}
            {/*        {Object.entries(BorderRadiusEnum).map(([key, value]) => (*/}
            {/*            <ChoiceboxItem onClick={() => {*/}
            {/*                setImageBorderRadius(value);*/}
            {/*            }} key={key} value={value} className={"w-full justify-center"}>*/}
            {/*                <ChoiceboxItemDescription>*/}
            {/*                    {key.toUpperCase()}*/}
            {/*                </ChoiceboxItemDescription>*/}
            {/*            </ChoiceboxItem>*/}
            {/*        ))}*/}
            {/*    </Choicebox>*/}
            {/*)}*/}
            <Choicebox defaultValue="2xl" className={"flex flex-row w-full"}>
                {Object.entries(BorderRadiusEnum).map(([key, value]) => (
                    <ChoiceboxItem onClick={() => {
                        setImageBorderRadius(value);
                    }} key={key} value={value} className={"w-full justify-center"}>
                        <ChoiceboxItemDescription>
                            <div className={`w-10 h-10 border-2 ${value}`}></div>
                        </ChoiceboxItemDescription>
                    </ChoiceboxItem>
                ))}
            </Choicebox>
        </Field>
    );
}

export default ProfilePictureInput;