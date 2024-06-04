"use client";
import React from 'react'
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/administrator/Shared/breadcrumb/Breadcrumb';
import UpdateOrderStatusTableList from '@/components/administrator/update-status-pesanan/UpdateOrderStatusTableList';

const BCrum = [
    { title: 'Dashboard', to: '/administrator/dashboard'},
    { title: 'Update Status Pesanan'}
]

const Page = () => {
    return (
        <PageContainer title="Update Status Pesanan" description="Update Status Pesanan">
            <Breadcrumb title="Update Status Pesanan" items={BCrum} />
            <UpdateOrderStatusTableList />
        </PageContainer>
    )
}

export default Page;