"use client";
import React from 'react'
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/administrator/Shared/breadcrumb/Breadcrumb';
import Profil from '@/components/administrator/profil/Profil';

const BCrum = [
    { title: 'Dashboard', to: '/administrator/dashboard'},
    { title: 'Profil'}
]

const Page = () => {
    return (
        <PageContainer title="Profil" description="Profil">
            <Breadcrumb title="Profil" items={BCrum} />
            <Profil />
        </PageContainer>
    )
}

export default Page;