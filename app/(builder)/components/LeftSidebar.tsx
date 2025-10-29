"use client";

import React, {useState} from 'react';
import {Field, FieldLabel} from "@/components/ui/field";
import {Input} from '@/components/ui/input';
import {Textarea} from "@/components/ui/textarea";
import {Dropzone, DropzoneContent, DropzoneEmptyState} from '@/components/ui/shadcn-io/dropzone';
import {Choicebox, ChoiceboxItem, ChoiceboxItemDescription} from '@/components/ui/shadcn-io/choicebox';

function LeftSidebar() {
    const [files, setFiles] = useState<File[] | undefined>();
    const [filePreview, setFilePreview] = useState<string | undefined>();
    const handleDrop = (files: File[]) => {
        setFiles(files);
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (typeof e.target?.result === 'string') {
                    setFilePreview(e.target?.result);
                }
            };
            reader.readAsDataURL(files[0]);
        }
    };
    return (
        <div className="flex flex-col h-full overflow-y-scroll bg-white p-8 border-r border-gray-200 max-w-1/4 w-full">
            <h5 className="mb-6">Content input</h5>
            <Field className="mb-4">
                <FieldLabel htmlFor="testimonialUser">Kind words by</FieldLabel>
                <Input id="testimonialUser" type="text" placeholder="Username or name"/>
            </Field>
            <Field className="mb-4">
                <FieldLabel htmlFor="userCorp">From</FieldLabel>
                <Input id="userCorp" type="text" placeholder="Corporation name"/>
                <Input id="userCorpLink" type="text" placeholder="Link"/>
            </Field>
            <Field className="mb-4">
                <FieldLabel htmlFor="separator">Separator</FieldLabel>
                <Input id="separator" type="text"/>
            </Field>
            <Field className="mb-4">
                <FieldLabel htmlFor="testimonialDescription">What did they say</FieldLabel>
                <Textarea id="testimonialDescription" placeholder="Their message here..."/>
            </Field>
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
                {filePreview && (
                    <Choicebox defaultValue="1" className={"flex flex-row w-full"}>
                        {["none", "2xl", "3xl", "full"].map((option) => (
                            <ChoiceboxItem key={option} value={option.toString()} className={"w-full justify-center"}>
                                <ChoiceboxItemDescription>
                                    {option.toUpperCase()}
                                </ChoiceboxItemDescription>
                            </ChoiceboxItem>
                        ))}
                    </Choicebox>
                )}
            </Field>
        </div>
    );
}

export default LeftSidebar;