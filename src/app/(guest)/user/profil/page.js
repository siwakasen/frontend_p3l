'use client';
import React from "react";
import PageContainer from "@/components/container/PageContainer";
import UserProfile from "@/components/user/profile/UserProfile";

const Page = () => {
    return (
        <PageContainer title="Profile" description="Profile">
            <UserProfile />
        </PageContainer>
    );
}

export default Page;