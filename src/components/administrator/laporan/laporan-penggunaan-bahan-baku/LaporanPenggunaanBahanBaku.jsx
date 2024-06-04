import React, { useState, useEffect, useRef } from 'react';
import { useReport } from './useReportPenggunaanBB';
import { Box, Stack, Typography, Button, useMediaQuery } from '@mui/material';
import ReportPDF from './LaporanPenggunaanBBPdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextFormField from '@/components/auth/shared/TextFormField';
import Toast from '@/components/shared/Toast';

const Report = () => {
    const { handleGetLaporan } = useReport();
    const [laporan, setLaporan] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const handleTampilkan = async () => {
        if (from === '' || to === '') {
            Toast().toastError('Tanggal tidak boleh kosong');
            return;
        }
        if (to < from || from > to) {
            Toast().toastError('Tanggal tidak valid');
            return;
        }
        const response = await handleGetLaporan(from, to);
        setLaporan(response.data);
        console.log(response.data);
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', width: '100%' }}>
                <Stack direction={isSmallScreen ? 'column' : 'row'} spacing={2} sx={{ flexGrow: 1, display: 'flex', alignItems: isSmallScreen ? 'flex' : 'center' }}>
                    <Typography variant="h5">Dari:</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        value={from}
                        onChange={(value) => {
                        if (value) {
                            setFrom(new Date(value).getFullYear() + "-" +
                            (new Date(value).getMonth() + 1) + "-" +
                            new Date(value).getDate());
                        }
                        }}
                        renderInput={(params) => <TextField {...params} id="from" />}
                    />
                    </LocalizationProvider>
                    <Typography variant="h5">Sampai:</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        value={to}
                        onChange={(value) => {
                        if (value) {
                            setTo(new Date(value).getFullYear() + "-" +
                            (new Date(value).getMonth() + 1) + "-" +
                            new Date(value).getDate());
                        }
                        }}
                        renderInput={(params) => <TextField {...params} id="to" />}
                    />
                    </LocalizationProvider>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center', marginTop: isSmallScreen ? 2 : 0 }}>
                    {laporan && laporan.length > 0 && (
                    <Button variant="contained" style={{ marginRight: 10 }}>
                        <PDFDownloadLink
                        document={<ReportPDF laporan={laporan} from={from} to={to} />}
                        fileName="laporan-penggunaan-bahan-baku.pdf"
                        >
                        {({ loading }) => (loading ? 'Loading document...' : 'Download Pdf')}
                        </PDFDownloadLink>
                    </Button>
                    )}
                    <Button variant="contained" onClick={() => handleTampilkan()}>
                    Tampilkan
                    </Button>
                </Stack>
            </Box>
            {laporan && laporan.length > 0 && (
                <div id="laporan-bulanan" style={{ marginTop: 20 }}>
                    <div>
                        <h1>Laporan Penggunaan Bahan Baku</h1>
                        <p>Jl. Centralpark No. 10 Yogyakarta</p>
                        <h1 style={{ textDecoration: 'underline', marginTop: 5, marginBottom: 5 }}>Tabel Laporan Penggunaan Bahan Baku</h1>
                        <table style={{ marginBottom: 20 }}>
                            <tbody>
                                <tr>
                                    <td>Periode</td>
                                    <td>:</td>
                                    <td>
                                        {new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(from))} - {new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(to))}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tanggal Cetak</td>
                                    <td>:</td>
                                    <td>{new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date())}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table border="1" style={{ width: '100%' }}>
                            <thead style={{ backgroundColor: '#f2f2f2' }}>
                                <tr>
                                    <th>Bahan Baku</th>
                                    <th style={{textAlign: "center"}}>Satuan</th>
                                    <th style={{textAlign: "center"}}>Jumlah</th>
                                </tr>
                            </thead>
                            <tbody>
                                {laporan && laporan.map((item) => (
                                    <tr key={item.id_bahan_baku}>
                                        <td>{item.nama_bahan_baku}</td>
                                        <td style={{textAlign: "center"}}>{item.satuan}</td>
                                        <td style={{textAlign: "center"}}>{item.jumlah}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};

export default Report;
