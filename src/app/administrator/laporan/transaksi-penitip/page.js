"use client"
import PageContainer from "@/components/container/PageContainer";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { getLaporanPenitip } from "@/services/laporan/laporan-penitip/laporan-penitip";
import { Box, Button, MenuItem, FormControl, Select, TextField } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import ReportPDF from "@/components/administrator/laporan/laporan-penitip/laporanPenitipLayout";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useState, useEffect } from "react";
import { LaporanPenitipTable } from "@/components/administrator/laporan/laporan-penitip/laporanPenitipTable";

export default function Page() {
    const [laporan, setLaporan] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const [bulan, setBulan] = useState(currentMonth);
    const [tahun, setTahun] = useState(currentYear);
    const [total, setTotal] = useState([]);

    useEffect(() => {
        console.log(bulan);
        console.log(tahun);
        const fetchData = async () => {
            setLoading(true);
            const response = await getLaporanPenitip(tahun, bulan);
            setData(response.data || []);
            console.log(response.data);
            setLoading(false);
            setLaporan(response.data || []);
        };
        fetchData();
    }, [tahun, bulan]);

    useEffect(() => {
        const tempTotals = data.map((item) => {
            return item.produk.map((produk) => {
                return ((produk.harga_produk * produk.Qty) - (produk.harga_produk * produk.Qty) * 0.2);
            }).reduce((acc, curr) => acc + curr, 0);
        });
        setTotal(tempTotals);
        console.log(tempTotals);
    }, [data]);

    const handleChangeMonth = (event) => {
        setBulan(event.target.value);
    };

    const handleChangeYear = (event) => {
        setTahun(event.target.value);
    };

    const headCells = [
        {
            id: "nama_produk",
            numeric: false,
            disablePadding: false,
            label: "Nama",
        },
        {
            id: "Qty",
            numeric: false,
            disablePadding: false,
            label: "Qty",
        },
        {
            id: "harga_produk",
            numeric: false,
            disablePadding: false,
            label: "Harga Jual",
        },
        {
            id: "total",
            numeric: false,
            disablePadding: false,
            label: "Total",
        },
        {
            id: "20_persen_komisi",
            numeric: false,
            disablePadding: false,
            label: "20% Komisi",
        },
        {
            id: "yang_diterima",
            numeric: false,
            disablePadding: false,
            label: "Yang Diterima",
        }
    ];

    const BCrumb = [
        {
            to: "/administrator/dashboard",
            title: "Administrator",
        },
        {
            title: "Laporan",
            to: "/administrator/dashboard",
        },
        {
            title: "Laporan Transaksi Penitip",
        },
    ];

    return (
        <PageContainer title="Laporan Transaksi Penitip" description="Data Laporan Transaksi Penitip">
            <Breadcrumb title="Laporan Transaksi Penitip" items={BCrumb} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mx: 2, my: 2 }}>
                <Box sx={{ fontSize: "16px" }}>
                    <FormControl>
                        <Select value={bulan} onChange={handleChangeMonth}>
                            <MenuItem value={1}>Januari</MenuItem>
                            <MenuItem value={2}>Februari</MenuItem>
                            <MenuItem value={3}>Maret</MenuItem>
                            <MenuItem value={4}>April</MenuItem>
                            <MenuItem value={5}>Mei</MenuItem>
                            <MenuItem value={6}>Juni</MenuItem>
                            <MenuItem value={7}>Juli</MenuItem>
                            <MenuItem value={8}>Agustus</MenuItem>
                            <MenuItem value={9}>September</MenuItem>
                            <MenuItem value={10}>Oktober</MenuItem>
                            <MenuItem value={11}>November</MenuItem>
                            <MenuItem value={12}>Desember</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        type="number"
                        sx={{ ml: 2 }}
                        value={tahun}
                        onChange={handleChangeYear}
                        InputProps={{ inputProps: { min: 1900, max: 2100 } }}
                    />
                </Box>
                <Button variant="contained" color="primary">
                    <PrintIcon sx={{ mr: 1 }} />
                    <PDFDownloadLink
                        document={<ReportPDF laporan={laporan} tahun={tahun} bulan={bulan} total={total} />}
                        fileName="laporan-presensi.pdf"
                    >
                        {({ loading }) => (loading ? 'Loading document...' : 'Download Pdf')}
                    </PDFDownloadLink>
                </Button>
            </Box>
            {data.map((item, index) => (
                <div key={index}>
                    <Box sx={{ display: "flex", mx: 2, my: 2 }}>
                        <Box sx={{ fontWeight: "bold", fontSize: "20px", backgroundColor: "seashell", p: "6px" }}>
                            {item.id_penitip}
                        </Box>
                        <Box sx={{ fontWeight: "bold", fontSize: "20px", backgroundColor: "seashell", p: "6px" }}>
                            {item.nama_penitip}
                        </Box>
                    </Box>
                    <LaporanPenitipTable
                        data={item.produk}
                        headCells={headCells}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mx: 2, my: 2 }}>
                        <Box />
                        <Box sx={{ fontWeight: "bold", fontSize: "20px", backgroundColor: "seashell", p: "6px" }}>
                            Total : {total[index]}
                        </Box>
                    </Box>
                </div>
            ))}
        </PageContainer>
    );
}
