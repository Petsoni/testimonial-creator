import React, {useMemo, useState} from 'react';
import Image from "next/image";
import {createAvatar, Style} from '@dicebear/core';
import {avataaars, lorelei, notionists, openPeeps, thumbs} from '@dicebear/collection';
import {Shuffle} from "lucide-react";
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {cn} from '@/lib/utils';
import {labelClass} from "./fieldStyles";

// Only styles that don't require attribution, since avatars end up in exported images
const AVATAR_STYLES: Record<string, { label: string, style: Style<object> }> = {
    notionists: {label: "Notionists", style: notionists},
    lorelei: {label: "Lorelei", style: lorelei},
    avataaars: {label: "Avataaars", style: avataaars},
    openPeeps: {label: "Open Peeps", style: openPeeps},
    thumbs: {label: "Thumbs", style: thumbs},
};

const BACKGROUND_COLORS = ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"];

// Fixed starting seeds so server and client render the same avatars
const INITIAL_SEEDS = ["Felix", "Aneka", "Jade", "Leo", "Maria", "Sam", "Riley", "Nolan"];

function randomSeeds() {
    return INITIAL_SEEDS.map(() => Math.random().toString(36).slice(2, 10));
}

// html2canvas drops most of an SVG avatar on export, so the card gets a PNG like an upload would
async function toPng(svgUri: string) {
    const image = new window.Image();
    image.src = svgUri;
    await image.decode();

    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    canvas.getContext("2d")!.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
}

function AvatarPicker({selected, onPick}: { selected: string | undefined, onPick: (avatar: string) => void }) {
    const [styleKey, setStyleKey] = useState("notionists");
    const [seeds, setSeeds] = useState<string[]>(INITIAL_SEEDS);
    const [picked, setPicked] = useState<{ svg: string, png: string }>();

    const avatars = useMemo(() => seeds.map((seed) => ({
        seed,
        uri: createAvatar(AVATAR_STYLES[styleKey].style, {
            seed,
            backgroundColor: BACKGROUND_COLORS,
        }).toDataUri(),
    })), [styleKey, seeds]);

    const handlePick = async (svg: string) => {
        const png = await toPng(svg);
        setPicked({svg, png});
        onPick(png);
    };

    // An uploaded image replaces the avatar, so only highlight while the card still shows it
    const isSelected = (svg: string) => picked?.svg === svg && selected === picked.png;

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className={labelClass}>Or pick an avatar</div>
                <Button variant="ghost" size="icon-sm"
                        aria-label="Shuffle avatars"
                        onClick={() => setSeeds(randomSeeds())}>
                    <Shuffle/>
                </Button>
            </div>
            <Select value={styleKey} onValueChange={setStyleKey}>
                <SelectTrigger className={"w-full"} aria-label="Avatar style">
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(AVATAR_STYLES).map(([key, {label}]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="grid grid-cols-4 gap-2">
                {avatars.map(({seed, uri}, index) => (
                    <button key={seed} type="button"
                            aria-label={`Use avatar ${index + 1}`}
                            aria-pressed={isSelected(uri)}
                            onClick={() => handlePick(uri)}
                            className={cn(
                                "aspect-square cursor-pointer overflow-hidden rounded-md border border-rule-soft outline-none transition-colors duration-150 ease-out hover:border-rule focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-ring",
                                isSelected(uri) && "border-rule ring-2 ring-primary ring-offset-2"
                            )}>
                        <Image width={56} height={56} src={uri} alt="" className={"size-full"}/>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default AvatarPicker;
