"use client";
import React from 'react'
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/administrator/Shared/breadcrumb/Breadcrumb';
import LaporanBulanan from '@/components/administrator/laporan/laporan-bulanan/LaporanBulanan';

const BCrum = [
    { title: 'Dashboard', to: '/administrator/dashboard'},
    { title: 'Laporan Bulanan'}
]

const Page = () => {
    return (
        <PageContainer title="Laporan Bulanan" description="Laporan Bulanan">
            <Breadcrumb title="Laporan Bulanan" items={BCrum} />
            <LaporanBulanan />
        </PageContainer>
    )
}

export default Page;