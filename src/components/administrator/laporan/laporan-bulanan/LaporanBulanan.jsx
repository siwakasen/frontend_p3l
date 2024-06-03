import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useReport } from './useReportBulanan';
import CustomSelect from '../../forms/CustomSelect';
import { MenuItem } from '@mui/material';
import ReportPDF from './LaporanBulananPdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const Report = () => {
    const { handleGetLaporan } = useReport();
    const [laporan, setLaporan] = useState([]);
    const [listYear, setListYear] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [chartImage, setChartImage] = useState('');
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await handleGetLaporan(year);
            setLaporan(response.data);
            setListYear(response.listYear);
        };
        fetchData();
    }, [year]);

    useEffect(() => {
        if (chartRef.current) {
            html2canvas(chartRef.current).then((canvas) => {
                setChartImage(canvas.toDataURL('image/png'));
            });
        }
    }, [laporan]);

    const changeYear = async (e) => {
        setYear(e.target.value);
        const response = await handleGetLaporan(e.target.value);
        setLaporan(response.data);
    };

    const chartOptions = {
        chart: {
            type: 'bar',
        },
        plotOptions: {
            bar: {
                columnWidth: '50%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
                },
            },
            tickAmount: 5,
        },
    };

    const chartSeries = [
        {
            name: 'Jumlah Uang',
            data: laporan ? laporan.map((item) => item.total) : [],
        },
    ];

    return (
        <>
            <PDFDownloadLink document={<ReportPDF year={year} laporan={laporan} chartImage={chartImage} />} fileName="laporan-bulanan.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download PDF'
                }
            </PDFDownloadLink>
            <div id="laporan-bulanan">
                <div>
                    <h1>Laporan Bulanan</h1>
                    <p>Jl. Centralpark No. 10 Yogyakarta</p>
                    <h1 style={{ textDecoration: 'underline', marginTop: 5, marginBottom: 5 }}>Tabel Laporan Bulanan</h1>
                    <table style={{ marginBottom: 20 }}>
                        <tbody>
                            <tr>
                                <td>Tahun</td>
                                <td>:</td>
                                <td>
                                    <CustomSelect
                                        value={year}
                                        onChange={(e) => changeYear(e)}
                                        style={{ width: 200 }}
                                    >
                                        {listYear && listYear.map((item) => (
                                            <MenuItem key={item.tahun} value={item.tahun}>{item.tahun}</MenuItem>
                                        ))}
                                    </CustomSelect>
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
                            <tr style={{ textAlign: 'center' }}>
                                <th>Bulan</th>
                                <th>Jumlah Transaksi</th>
                                <th>Jumlah Uang</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center' }}>
                            {laporan && laporan.map((item) => {
                                if (item.jumlah_pesanan > 0) {
                                    return <tr key={item.bulan}>
                                        <td>{new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(new Date(year, item.bulan - 1))}</td>
                                        <td>{item.jumlah_pesanan}</td>
                                        <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.total)}</td>
                                    </tr>
                                }
                            })}
                        </tbody>
                        <tfoot>
                            <tr style={{ textAlign: 'center' }}>
                                <td>Total</td>
                                {laporan && (
                                    <>
                                        <td>{laporan.reduce((acc, curr) => acc + curr.jumlah_pesanan, 0)}</td>
                                        <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(laporan.reduce((acc, curr) => acc + curr.total, 0))}</td>
                                    </>
                                )}
                                {!laporan && (
                                    <>
                                        <td>0</td>
                                        <td>Rp. 0, 00</td>
                                    </>
                                )}
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div ref={chartRef}>
                    <Chart options={chartOptions} series={chartSeries} type="bar" height={350} width={'100%'} />
                </div>
            </div>
        </>
    );
};

export default Report;
