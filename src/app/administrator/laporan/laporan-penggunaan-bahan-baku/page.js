"use client";
import React from 'react'
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/administrator/Shared/breadcrumb/Breadcrumb';
import LaporanPenggunaanBahanBaku from '@/components/administrator/laporan/laporan-penggunaan-bahan-baku/LaporanPenggunaanBahanBaku';

const BCrum = [
    { title: 'Dashboard', to: '/administrator/dashboard'},
    { title: 'Laporan Penggunaan Bahan Baku'}
]

const Page = () => {
    return (
        <PageContainer title="Laporan Penggunaan Bahan Baku" description="Laporan Penggunaan Bahan Baku">
            <Breadcrumb title="Laporan Penggunaan Bahan Baku" items={BCrum} />
            <LaporanPenggunaanBahanBaku />
        </PageContainer>
    )
}

export default Page;