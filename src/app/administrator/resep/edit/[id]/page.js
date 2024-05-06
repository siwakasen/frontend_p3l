"use client";
import React from 'react'
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/administrator/Shared/breadcrumb/Breadcrumb';
import { Box } from '@mui/material';
import EditResepForm from '@/components/administrator/resep/EditResepForm';

const BCrum = [
    { title: 'Dashboard', to: '/administrator/dashboard'},
    { title: 'Resep', to: '/administrator/resep'},
    { title: 'Ubah Resep'}
]

const Page = ({ params }) => {
    return (
        <PageContainer title="Ubah Resep" description="Ubah Resep">
            <Breadcrumb title="Ubah Resep" items={BCrum} />
            <Box>
                <EditResepForm id={params.id} />
            </Box>
        </PageContainer>
    )
}

export default Page;