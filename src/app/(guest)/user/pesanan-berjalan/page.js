'use client';
import React from "react";
import PageContainer from "@/components/container/PageContainer";
import OrderOnProgress from "@/components/user/OrderOnProgress";

const Page = () => {
    return (
        <PageContainer title="Pesanan Berjalan" description="Pesanan Berjalan">
            <OrderOnProgress />
        </PageContainer>
    );
}

export default Page;