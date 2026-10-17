import React from 'react';
import {IconHeart, IconMessageCircle, IconRepeat} from "@tabler/icons-react";
import ExportFrame from "@/app/components/landing/ExportFrame";
import {exampleStudio, exampleTestimonials} from "@/app/components/landing/example-testimonials";

function PostMock() {
    const example = exampleTestimonials.lucia;

    return (
        <div role="img"
             aria-label={`An exported card shared in a social media post by ${exampleStudio.name}`}
             className={"mx-auto w-full max-w-md rounded-2xl border border-[var(--gray-100)] bg-white p-4 shadow-sm"}>
            <div aria-hidden className={"flex flex-col gap-3"}>
                <div className={"flex items-center gap-3"}>
                    <div className={"grid size-10 shrink-0 place-items-center rounded-full bg-[var(--gray-950)] text-sm text-white"}>
                        {exampleStudio.initials}
                    </div>
                    <div className={"min-w-0 text-sm leading-tight"}>
                        <div className={"text-[var(--gray-950)]"}>{exampleStudio.name}</div>
                        <div className={"text-[var(--gray-500)]"}>{exampleStudio.handle} · 2h</div>
                    </div>
                </div>
                <div className={"text-[15px] leading-normal text-[var(--gray-900)]"}>
                    {example.userFirm}&apos;s new site went live this week. Their words, not ours:
                </div>
                <ExportFrame example={example} className={"rounded-xl ring-1 ring-black/5"}/>
                <div className={"flex gap-6 pt-1 text-sm text-[var(--gray-500)] tabular-nums"}>
                    <div className={"flex items-center gap-1.5"}><IconHeart className={"size-4"}/>128</div>
                    <div className={"flex items-center gap-1.5"}><IconMessageCircle className={"size-4"}/>14</div>
                    <div className={"flex items-center gap-1.5"}><IconRepeat className={"size-4"}/>9</div>
                </div>
            </div>
        </div>
    );
}

export default PostMock;
