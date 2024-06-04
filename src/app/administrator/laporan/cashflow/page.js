"use client"
import PageContainer from "@/components/container/PageContainer";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { getLaporanCashflow } from "@/services/laporan/cashflow/cashflow";
import { Box, Button, MenuItem, FormControl, Select, TextField } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import ReportPDF from "@/components/administrator/laporan/cashflow/cashflowLayout";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useState, useEffect } from "react";
import { CashflowTable } from "@/components/administrator/laporan/cashflow/cashflowTable";
export default function Page() {
    const [laporan, setLaporan] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const [bulan, setBulan] = useState(currentMonth);
    const [tahun, setTahun] = useState(currentYear);

    useEffect(() => {
        console.log(bulan);
        console.log(tahun);
        const fetchData = async () => {
            setLoading(true);
            const response = await getLaporanCashflow(tahun, bulan);
            setData(response.data || []);
            console.log(response.data);
            setLoading(false);
            setLaporan(response.data || []);
        };
        fetchData();
    }, [tahun, bulan]);

    const handleChangeMonth = (event) => {
        setBulan(event.target.value);
    };

    const handleChangeYear = (event) => {
        setTahun(event.target.value);
    };

    const headCells = [
        {
            id: "",
            numeric: false,
            disablePadding: false,
            label: "",
        },
        {
            id: "pemasukan",
            numeric: false,
            disablePadding: false,
            label: "Pemasukan",
        },
        {
            id: "pengeluaran",
            numeric: false,
            disablePadding: false,
            label: "Pengeluaran",
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
            title: "Cashflow",
        },
    ];

    return (
        <PageContainer title="Laporan Pemasukan dan Pengeluaran" description="Data Laporan Pemasukan dan Pengeluaran">
            <Breadcrumb title="Laporan Pemasukan dan Pengeluaran" items={BCrumb} />
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
                        document={<ReportPDF laporan={laporan} tahun={tahun} bulan={bulan} />}
                        fileName="laporan-presensi.pdf"
                    >
                        {({ loading }) => (loading ? 'Loading document...' : 'Download Pdf')}
                    </PDFDownloadLink>
                </Button>
            </Box>
            <CashflowTable data={data} headCells={headCells} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mx: 2, my: 2 }}>
                <Box />
                <Box sx={{ fontWeight: "bold", fontSize: "16px", backgroundColor: "cornflowerblue", p: "6px", color: "white" }}>
                    Total : {data.total}
                </Box>
            </Box>
        </PageContainer>
    );
}
