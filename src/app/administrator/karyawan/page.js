"use client";
import React from 'react'
import PageContainer from '@/components/container/PageContainer';
import Breadcrumb from '@/layouts/administrator/Shared/breadcrumb/Breadcrumb';
import EmployeesTableList from '@/components/administrator/karyawan/EmployeesTableList';

const BCrum = [
    { title: 'Dashboard', to: '/administrator/dashboard'},
    { title: 'Karyawan'}
]

const Page = () => {
    return (
        <PageContainer title="Karyawan" description="Karyawan">
            <Breadcrumb title="Karyawan" items={BCrum} />
            <EmployeesTableList />
        </PageContainer>
    )
}

export default Page;