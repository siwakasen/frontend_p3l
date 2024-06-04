"use client";
import React from 'react'
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/administrator/Shared/breadcrumb/Breadcrumb';
import CancelOrder from '@/components/administrator/pembatalan-pesanan/CancelOrder';

const BCrum = [
    { title: 'Dashboard', to: '/administrator/dashboard'},
    { title: 'Pembatalan Pesanan'}
]

const Page = () => {
    return (
        <PageContainer title="Pembatalan Pesanan" description="Pembatalan Pesanan">
            <Breadcrumb title="Pembatalan Pesanan" items={BCrum} />
            <CancelOrder />
        </PageContainer>
    )
}

export default Page;