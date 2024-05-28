"use client";
import React from 'react'
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/administrator/Shared/breadcrumb/Breadcrumb';
import DetailOrder from '@/components/administrator/pesanan-masuk/DetailOrder';

const BCrum = [
    { title: 'Dashboard', to: '/administrator/dashboard'},
    { title: 'Pesanan Masuk', to: '/administrator/pesanan-masuk'},
    { title: 'Detail Pesanan'}
]

const Page = ({params}) => {
    return (
        <PageContainer title="Detail Pesanan" description="Detail Pesanan">
            <Breadcrumb title="Detail Pesanan" items={BCrum} />
            <DetailOrder id={params.id} />
        </PageContainer>
    )
}

export default Page;