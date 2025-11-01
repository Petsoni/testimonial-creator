"use client";

import React from 'react';
import UsernameInput from '@/app/(builder)/components/left-sidebar/components/UsernameInput';
import FirmInput from '@/app/(builder)/components/left-sidebar/components/FirmInput';
import SeparatorInput from '@/app/(builder)/components/left-sidebar/components/SeparatorInput';
import TestimonialInput from '@/app/(builder)/components/left-sidebar/components/TestimonialInput';
import ProfilePictureInput from "@/app/(builder)/components/left-sidebar/components/ProfilePictureInput";

function LeftSidebar() {
    return (
        <div className="flex flex-col h-full lg:overflow-y-scroll bg-white p-8 border-r border-gray-200 w-full">
            <h5 className="mb-6">Content input</h5>

            <UsernameInput/>
            <FirmInput/>
            <SeparatorInput/>
            <TestimonialInput/>
            <ProfilePictureInput/>
        </div>
    );
}

export default LeftSidebar;