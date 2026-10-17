import React from 'react';
import Reveal from "@/app/components/landing/Reveal";

function UseCase({title, description, children}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <li className={"flex flex-col gap-6"}>
            <Reveal inView className={"flex flex-col items-center gap-1 text-center"}>
                <h3 className={"text-xl leading-snug font-semibold tracking-[-0.02em] sm:text-2xl"}>{title}</h3>
                <p className={"max-w-[48ch] text-balance text-ink-2"}>{description}</p>
            </Reveal>
            <Reveal inView delay={0.06} y={16}>
                {children}
            </Reveal>
        </li>
    );
}

export default UseCase;
