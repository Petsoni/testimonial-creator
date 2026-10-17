"use client";

import React from "react";
import {useIsDesktop} from "@/hooks/use-is-desktop";
import StudioLayout from "./StudioLayout";
import DockLayout from "./DockLayout";

/** Side panels from 1024px up; an on-demand dock below that. Card state lives in context, so switching keeps it. */
function BuilderLayout() {
    const isDesktop = useIsDesktop();

    // Until the viewport is known, render neither layout rather than flash the wrong one.
    if (isDesktop === null) return <div className="min-h-dvh"/>;

    return isDesktop ? <StudioLayout/> : <DockLayout/>;
}

export default BuilderLayout;
