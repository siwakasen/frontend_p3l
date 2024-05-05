"use client";
import React from 'react'
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/administrator/Shared/breadcrumb/Breadcrumb';
import RecipesTableList from '@/components/administrator/resep/RecipesTableList';

const BCrum = [
    { title: 'Dashboard', to: '/administrator/dashboard'},
    { title: 'Resep'}
]

const Page = () => {
    return (
        <PageContainer title="Resep" description="Resep">
            <Breadcrumb title="Resep" items={BCrum} />
            <RecipesTableList />
        </PageContainer>
    )
}

export default Page;