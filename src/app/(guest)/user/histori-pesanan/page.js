'use client';
import React from "react";
import PageContainer from "@/components/container/PageContainer";
import OrderHistory from "@/components/user/orderHistory";

const Page = () => {
    return (
        <PageContainer title="Histori Pesanan" description="Histori Pesanan">
            <OrderHistory />
        </PageContainer>
    );
}

export default Page;