"use client";
import React from 'react'
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/administrator/Shared/breadcrumb/Breadcrumb';
import { Box } from '@mui/material';
import EditKaryawanForm from '@/components/administrator/karyawan/editKaryawanForm';
const BCrum = [
    { title: 'Dashboard', to: '/administrator/dashboard'},
    { title: 'Karyawan', to: '/administrator/karyawan'},
    { title: 'Ubah Karyawan'}
]

const Page = ({ params }) => {
    return (
        <PageContainer title="Ubah Karyawan" description="Ubah Karyawan">
            <Breadcrumb title="Ubah Karyawan" items={BCrum} />
            <Box>
                <EditKaryawanForm id={params.id} />
            </Box>
        </PageContainer>
    )
}

export default Page;