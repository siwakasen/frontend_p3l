"use client";
import React from 'react'
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/administrator/Shared/breadcrumb/Breadcrumb';
import { Box } from '@mui/material';
import AddResepForm from '@/components/administrator/resep/addResepForm';

const BCrum = [
    { title: 'Dashboard', to: '/administrator/dashboard'},
    { title: 'Resep', to: '/administrator/resep'},
    { title: 'Tambah Resep'}
]

const Page = () => {
    return (
        <PageContainer title="Tambah Resep" description="Tambah Resep">
            <Breadcrumb title="Tambah Resep" items={BCrum} />
            <Box>
                <AddResepForm />
            </Box>
        </PageContainer>
    )
}

export default Page;