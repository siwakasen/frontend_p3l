"use client";
import React from 'react'
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/administrator/Shared/breadcrumb/Breadcrumb';
import NewOrderTableList from '@/components/administrator/pesanan-masuk/NewOrderTableList';

const BCrum = [
    { title: 'Dashboard', to: '/administrator/dashboard'},
    { title: 'Pesanan Masuk'}
]

const Page = () => {
    return (
        <PageContainer title="Pesanan Masuk" description="Pesanan Masuk">
            <Breadcrumb title="Pesanan Masuk" items={BCrum} />
            <NewOrderTableList />
        </PageContainer>
    )
}

export default Page;