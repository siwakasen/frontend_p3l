"use client";
import React from 'react'
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/administrator/Shared/breadcrumb/Breadcrumb';
import { Box } from '@mui/material';
import AddKaryawanForm from '@/components/administrator/karyawan/addKaryawanForm';

const BCrum = [
    { title: 'Dashboard', to: '/administrator/dashboard'},
    { title: 'Karyawan', to: '/administrator/karyawan'},
    { title: 'Tambah Karyawan'}
]

const Page = () => {
    return (
        <PageContainer title="Tambah Karyawan" description="Tambah Karyawan">
            <Breadcrumb title="Tambah Karyawan" items={BCrum} />
            <Box>
                <AddKaryawanForm />
            </Box>
        </PageContainer>
    )
}

export default Page;