import React, {useId, useState} from "react";
import Image from "next/image";
import {type FileRejection, useDropzone} from "react-dropzone";
import {ImageIcon, LoaderCircle, X} from "lucide-react";
import {useTestimonialContent} from "@/context/TestimonialContentContext";
import {Field, FieldError} from "@/components/ui/field";
import {Button} from "@/components/ui/button";
import {Slider} from "@/components/ui/slider";
import {cn} from "@/lib/utils";
import {hintClass, labelClass, readoutClass} from "./fieldStyles";
import AvatarPicker from "./AvatarPicker";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
// The card renders the photo at 56px, so half of that is a full circle.
const CIRCLE_RADIUS = 28;

function rejectionMessage(rejection: FileRejection) {
    switch (rejection.errors[0]?.code) {
        case "file-too-large":
            return "That photo is over 5 MB. Try a smaller one.";
        case "file-invalid-type":
            return "That file isn't an image. Use a PNG, JPG or WebP.";
        case "too-many-files":
            return "Drop one photo at a time.";
        default:
            return "Couldn't use that file. Try another image.";
    }
}

function PhotoField() {
    const labelId = useId();
    const {
        profilePicturePreview,
        setProfilePicturePreview,
        imageBorderRadius,
        setImageBorderRadius,
    } = useTestimonialContent();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {getRootProps, getInputProps, isDragActive, open} = useDropzone({
        accept: {"image/png": [], "image/jpeg": [], "image/webp": [], "image/gif": []},
        maxFiles: 1,
        multiple: false,
        maxSize: MAX_PHOTO_BYTES,
        // The visible Choose/Replace button opens the picker, so the drop area stays a plain drop target.
        noClick: true,
        noKeyboard: true,
        onDrop: (accepted, rejected) => {
            if (rejected.length > 0) {
                setError(rejectionMessage(rejected[0]));
                return;
            }
            const file = accepted[0];
            if (!file) return;
            setError(null);
            setLoading(true);
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") setProfilePicturePreview(reader.result);
                setLoading(false);
            };
            reader.onerror = () => {
                setError("Couldn't read that file. Try another image.");
                setLoading(false);
            };
            reader.readAsDataURL(file);
        },
    });

    const hasPhoto = Boolean(profilePicturePreview);

    return (
        <div role="group" aria-labelledby={labelId} className="flex flex-col gap-3">
            <div id={labelId} className={cn(labelClass, "font-medium")}>Photo</div>
            <div
                {...getRootProps({
                    className: cn(
                        "flex items-center gap-3 rounded-lg border border-dashed bg-background p-2.5 transition-colors",
                        isDragActive && "border-ring bg-accent",
                        error && "border-destructive/60"
                    ),
                })}
            >
                <input {...getInputProps({"aria-label": "Upload a photo"})}/>
                <div
                    className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden bg-muted text-muted-foreground"
                    style={{borderRadius: hasPhoto ? Math.round(imageBorderRadius * (44 / 56)) : 8}}
                >
                    {loading ? (
                        <LoaderCircle className="size-4 motion-safe:animate-spin" aria-label="Loading photo"/>
                    ) : hasPhoto ? (
                        <Image src={profilePicturePreview!} alt="Current photo" fill sizes="44px" className="object-cover"/>
                    ) : (
                        <ImageIcon className="size-4" aria-hidden/>
                    )}
                </div>
                <div className="min-w-0 flex-1 leading-tight">
                    <div className="truncate text-sm">
                        {isDragActive ? "Drop to use this photo" : hasPhoto ? "Photo added" : "Drag a photo here"}
                    </div>
                    <small className={cn(hintClass, "block truncate")}>PNG, JPG or WebP, up to 5 MB</small>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={open} className="text-sm!">
                    {hasPhoto ? "Replace" : "Choose"}
                </Button>
                {hasPhoto && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Remove photo"
                        onClick={() => {
                            setProfilePicturePreview(undefined);
                            setError(null);
                        }}
                    >
                        <X/>
                    </Button>
                )}
            </div>
            {error && <FieldError>{error}</FieldError>}
            <AvatarPicker
                selected={profilePicturePreview}
                onPick={(avatar) => {
                    setProfilePicturePreview(avatar);
                    setError(null);
                }}
            />
            <Field data-disabled={!hasPhoto || undefined}>
                <div className="flex items-baseline justify-between">
                    <div className={cn(labelClass, "font-medium")}>Photo corners</div>
                    <output className={readoutClass}>
                        {imageBorderRadius >= CIRCLE_RADIUS ? "Circle" : `${imageBorderRadius}px`}
                    </output>
                </div>
                <Slider
                    value={[imageBorderRadius]}
                    min={0}
                    max={CIRCLE_RADIUS}
                    step={1}
                    disabled={!hasPhoto}
                    thumbLabel="Photo corner radius"
                    onValueChange={([value]) => setImageBorderRadius(value)}
                    className="py-1.5"
                />
            </Field>
        </div>
    );
}

export default PhotoField;
