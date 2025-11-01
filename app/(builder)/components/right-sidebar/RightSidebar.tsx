import React from 'react';
import {Separator} from '@/components/ui/separator';
import DisplayTypeInput from "@/app/(builder)/components/right-sidebar/components/DisplayTypeInput";
import CardColorInput from './components/CardColorInput';
import CardBorderRadiusInput from "@/app/(builder)/components/right-sidebar/components/CardBorderRadiusInput";
import CardShadowInput from './components/CardShadowInput';
import CardBorderInput from "@/app/(builder)/components/right-sidebar/components/CardBorderInput";

function RightSidebar() {

    return (
        <div className="flex flex-col h-full bg-white p-8 sm:max-md:border-none border-l border-gray-200 w-full">
            <h5 className={"mb-6"}>Make it your own</h5>
            <DisplayTypeInput/>
            <CardColorInput/>
            <CardBorderRadiusInput/>
            <Separator className={"mb-4"}/>
            <CardBorderInput/>
            <Separator className={"mb-4"}/>
            <CardShadowInput/>
        </div>
    );
}

export default RightSidebar;