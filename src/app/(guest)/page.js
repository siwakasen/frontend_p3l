'use client';
import React from "react";
import PageContainer from "@/components/container/PageContainer";
import Carousel from "@/components/user/home/Carousel";
import ProfileBox from "@/components/user/home/ProfileBox";
import Shop from "@/components/user/home/Shop";

const Page = () => {
    return (
        <PageContainer title="Atma Kitchen" description="Atma Kitchen">
            <Carousel />
            <ProfileBox />
            <Shop />
        </PageContainer>
    );
}

export default Page;
