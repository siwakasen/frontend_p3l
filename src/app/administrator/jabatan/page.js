"use client";
import React from 'react';
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/administrator/Shared/breadcrumb/Breadcrumb';
import RolesTableList from '@/components/administrator/jabatan/JabatanTableList';

const BCrum = [
    { title: 'Dashboard', to: '/administrator/dashboard'},
    { title: 'Jabatan'}
]

const Page = () => {
    return (
        <PageContainer title="Jabatan" description="Jabatan">
            <Breadcrumb title="Jabatan" items={BCrum} />
            <RolesTableList />
        </PageContainer>
    )
}

export default Page;