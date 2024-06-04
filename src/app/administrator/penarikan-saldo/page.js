"use client"
import PageContainer from "@/components/container/PageContainer";
import { useEffect, useState } from "react";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { getPenarikanSaldo } from "@/services/penaraikan-saldo/penarikan-saldo";
import { PenarikanSaldoSearchTable } from "@/components/administrator/penarikan-saldo/PenarikanSaldoSearchTable";

export default function Page() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getPenarikanSaldo();
            setData(response.data);
            setLoading(false);
        };
        fetchData();
    }, [loading]);

    const headCells = [
        {
            id: "nama",
            numeric: false,
            disablePadding: false,
            label: "User",
        },
        {
            id: "nominal_saldo",
            numeric: false,
            disablePadding: false,
            label: "Nominal Saldo",
        },
        {
            id: "keterangan_transaksi",
            numeric: false,
            disablePadding: false,
            label: "Keterangan",
        },
        {
            id: "tanggal_pengajuan",
            numeric: false,
            disablePadding: false,
            label: "Tanggal Pengajuan"
        },
        {
            id: "tanggal_konfirmasi",
            numeric: false,
            disablePadding: false,
            label: "Tanggal Konfirmasi"
        }
    ];

    const BCrumb = [
        {
            to: "/administrator/dashboard",
            title: "Administrator",
        },
        {
            title: "Penarikan Saldo",
        },
    ];

    return (
        <PageContainer title="Penarikan Saldo" description="Data Penarikan Saldo">
            <Breadcrumb title="Penarikan Saldo" items={BCrumb} />
            <PenarikanSaldoSearchTable
                data={data}
                headCells={headCells}
                setLoading={setLoading}
                loading={loading}
            />
        </PageContainer>
    );
}
