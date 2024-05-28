"use client"
import PageContainer from "@/components/container/PageContainer";
import { Alert, Divider } from "@mui/material";
import { getBahanBakuKurang } from "@/services/pesanan/pesanan";
import { useState, useEffect } from "react";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { getPesananValid } from "@/services/pesanan/pesanan";
import { PesananSearchTableOnMO } from "@/components/administrator/pesanan/PesananSearchTableOnMO";
import { BahanBakuSearchTable } from "@/components/administrator/bahan-baku/BahanBakuSearchTable";
export default function Page() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataBahanBaku, setDataBahanBaku] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getPesananValid('');
            setData(response.data);
        };
        const fetchDataBahanBaku = async () => {
            const response = await getBahanBakuKurang();
            setDataBahanBaku(response.data);
            console.log(response.data);
        }
        fetchDataBahanBaku();
        fetchData();
    }, [loading]);


    const headCellsPesanan = [
        {
            id: 'id_pesanan',
            numeric: false,
            disablePadding: false,
            label: 'ID Pesanan',
        },
        {
            id: 'detail_pesanan',
            numeric: false,
            disablePadding: false,
            label: 'Detail Pesanan',
        },
        {
            id: 'total_harga',
            numeric: false,
            disablePadding: false,
            label: 'Total Harga',
        },
        {
            id: 'ongkir',
            numeric: false,
            disablePadding: false,
            label: 'Ongkir',
        },
        {
            id: 'total_bayar',
            numeric: false,
            disablePadding: false,
            label: 'Total Bayar',
        },
        {
            id: 'tip',
            numeric: false,
            disablePadding: false,
            label: 'Tip',
        },
        {
            id: 'poin_dipakai',
            numeric: false,
            disablePadding: false,
            label: 'Poin Dipakai',
        },
        {
            id: 'poin_didapat',
            numeric: false,
            disablePadding: false,
            label: 'Poin Didapat',
        },
        {
            id: 'tanggal_pesanan',
            numeric: false,
            disablePadding: false,
            label: 'Tanggal Pesanan',
        },
        {
            id: 'tanggal_diambil',
            numeric: false,
            disablePadding: false,
            label: 'Tanggal Diambil',
        },
        {
            id: 'tanggal_pembayaran',
            numeric: false,
            disablePadding: false,
            label: 'Tanggal Pembayaran',
        },
        {
            id: 'alamat_pengiriman',
            numeric: false,
            disablePadding: false,
            label: 'Alamat Pengiriman',
        },
        {
            id: 'status_transaksi',
            numeric: false,
            disablePadding: false,
            label: 'Status Transaksi',
        },
        {
            id: 'metode_pemesanan',
            numeric: false,
            disablePadding: false,
            label: 'Metode Pemesanan',
        },
        {
            id: 'metode_pengiriman',
            numeric: false,
            disablePadding: false,
            label: 'Metode Pengiriman',
        },
    ];

    const headCellsBahanBaku = [
        {
            id: "nama_bahan_baku",
            numeric: false,
            disablePadding: false,
            label: "Bahan Baku",
        },
        {
            id: "stok",
            numeric: false,
            disablePadding: false,
            label: "Bahan Baku Kurang",
        },
        {
            id: "satuan",
            numeric: false,
            disablePadding: false,
            label: "Satuan",
        },
        {
            id: "action",
            numeric: false,
            disablePadding: false,
            label: "Action",
        },
    ];

    const BCrumb = [
        {
            to: "/administrator/dashboard",
            title: "Administrator",
        },
        {
            to: "/administrator/dashboard",
            title: "Pesanan",
        },
        {
            title: "Konfirmasi",
        }
    ];


    return (
        <PageContainer title="Pesanan" description="Data Pesanan">
            <Breadcrumb title="Pesanan" items={BCrumb} />
            <Alert severity="info" icon={false} sx={{ mb: "8px", fontSize: "14px", mx: 2 }}>
                Pesanan Perlu Dikonfirmasi
            </Alert>
            <PesananSearchTableOnMO
                data={data}
                headCells={headCellsPesanan}
                setLoading={setLoading}
                loading={loading}
            />
            <Divider sx={{ mb: '20px', mx: 2 }}></Divider>
            <Alert severity="info" icon={false} sx={{ mb: "8px", fontSize: "14px", mx: 2 }}>
                Bahan Baku Yang Perlu Dibeli
            </Alert>
            <BahanBakuSearchTable
                data={dataBahanBaku}
                headCells={headCellsBahanBaku}
                setLoading={setLoading}
                loading={loading}
            />
        </PageContainer>
    );
}
