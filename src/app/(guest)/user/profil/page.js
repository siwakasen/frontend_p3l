'use client';
import React from "react";
import PageContainer from "@/components/container/PageContainer";
import UserProfile from "@/components/user/profile";

const Page = () => {
    return (
        <PageContainer title="Profil" description="Profil">
            <UserProfile />
        </PageContainer>
    );
}

export default Page;