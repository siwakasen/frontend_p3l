"use client"
import PageContainer from "@/components/container/PageContainer";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { getLaporanPresensi } from "@/services/laporan-presensi/laporan-presensi";
import { LaporanPresensiTable } from "@/components/administrator/laporan/laporan-presensi/LaporanPresensiTable";
import { Box, Button, MenuItem, FormControl, Select, TextField } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import ReportPDF from "@/components/administrator/laporan/laporan-presensi/laporanPresensiLayout";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useState, useEffect } from "react";

export default function Page() {
    const [laporan, setLaporan] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, so add 1
    const currentYear = currentDate.getFullYear(); // getFullYear() returns the 4-digit year
    const [total, setTotal] = useState(0);
    const [totalAll, setTotalAll] = useState(0);
    const [bulan, setBulan] = useState(currentMonth);
    const [tahun, setTahun] = useState(currentYear);
    const month = currentDate.toLocaleString('default', { month: 'long' });

    useEffect(() => {
        console.log(bulan);
        console.log(tahun);
        const fetchData = async () => {
            setLoading(true);
            const response = await getLaporanPresensi(tahun, bulan);
            setData(response.data);
            console.log(response);
            setLoading(false);
            setLaporan(response.data);
        };
        fetchData();

    }, [tahun, bulan]);

    useEffect(() => {
        const temp = data.map((item) => {
            return item.role.nominal_gaji + item.bonus_gaji;
        });
        setTotal(temp);
        const sum = temp.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setTotalAll(sum);
        console.log(temp);
        console.log(sum);
    }, [data]);

    const handleChangeMonth = (event) => {
        setBulan(event.target.value);
    };

    const handleChangeYear = (event) => {
        setTahun(event.target.value);
    };
    const headCells = [
        {
            id: "nama_karyawan",
            numeric: false,
            disablePadding: false,
            label: "Nama",
        },
        {
            id: "jumlah_hadir",
            numeric: false,
            disablePadding: false,
            label: "Jumlah Hadir",
        },
        {
            id: "jumlah_bolos",
            numeric: false,
            disablePadding: false,
            label: "Jumlah Bolos",
        },
        {
            id: "honor_harian",
            numeric: false,
            disablePadding: false,
            label: "Honor Harian",
        },
        {
            id: "bonus_rajin",
            numeric: false,
            disablePadding: false,
            label: "Bonus Rajin",
        },
        {
            id: "total",
            numeric: false,
            disablePadding: false,
            label: "Total",
        }
    ];

    const BCrumb = [
        {
            to: "/administrator/dashboard",
            title: "Administrator",
        },
        {
            title: "Laporan Presensi",
        },
    ];




    return (
        <PageContainer PageContainer title="Laporan Presensi" description="Data Laporan Presensi" >
            <Breadcrumb title="Laporan Presensi" items={BCrumb} />
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
                        InputProps={{ inputProps: { min: 1900, max: 2100 } }} // Limit year range
                    />
                </Box>
                <Button variant="contained" color="primary" >
                    <PrintIcon sx={{ mr: 1 }} />
                    <PDFDownloadLink
                        document={<ReportPDF laporan={laporan} tahun={tahun} bulan={month} />}
                        fileName="laporan-presensi.pdf"
                    >
                        {({ loading }) => (loading ? 'Loading document...' : 'Download Pdf')}
                    </PDFDownloadLink>
                </Button>
            </Box>
            <LaporanPresensiTable
                data={data}
                headCells={headCells}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mx: 2, my: 2 }}>
                <Box />
                <Box sx={{ fontWeight: "bold", fontSize: "20px", backgroundColor: "seashell", p: "6px" }}>
                    Total : {totalAll}
                </Box>
            </Box>
        </PageContainer>
    );
}
