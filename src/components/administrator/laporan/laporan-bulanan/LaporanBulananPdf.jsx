// components/LaporanBulananPdf.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        marginBottom: 10,
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        width: '33.33%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        textAlign: 'center',
        padding: 5,
    },
    tableCellHeader: {
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold',
    },
    tableCell: {
        padding: 5,
    },
    totalRow: {
        fontWeight: 'bold',
    },
    chart: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
    },
});

const ReportPDF = ({ year, laporan, chartImage }) => {
    const printDate = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date());

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text>Laporan Bulanan</Text>
                    <Text>Jl. Centralpark No. 10 Yogyakarta</Text>
                    <Text style={{ textDecoration: 'underline', marginTop: 5, marginBottom: 5 }}>Tabel Laporan Bulanan</Text>
                </View>

                <View style={styles.section}>
                    <Text>Tahun: {year}</Text>
                    <Text>Tanggal Cetak: {printDate}</Text>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Bulan</Text>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Jumlah Transaksi</Text>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Jumlah Uang</Text>
                    </View>
                    {laporan && laporan.map((item) => {
                        if (item.jumlah_pesanan > 0) {
                            return <View style={styles.tableRow} key={item.bulan}>
                                <Text style={styles.tableCol}>{new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(new Date(year, item.bulan - 1))}</Text>
                                <Text style={styles.tableCol}>{item.jumlah_pesanan}</Text>
                                <Text style={styles.tableCol}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.total)}</Text>
                            </View>
                        }
                    })}
                    <View style={[styles.tableRow, styles.totalRow]}>
                        <Text style={styles.tableCol}>Total</Text>
                        {laporan && (
                            <>
                                <Text style={styles.tableCol}>{laporan.reduce((acc, curr) => acc + curr.jumlah_pesanan, 0)}</Text>
                                <Text style={styles.tableCol}>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(laporan.reduce((acc, curr) => acc + curr.total, 0))}</Text>
                            </>
                        )}
                        {!laporan && (
                            <>
                                <Text style={styles.tableCol}>0</Text>
                                <Text style={styles.tableCol}>Rp. 0, 00</Text>
                            </>
                        )}
                    </View>
                </View>

                <View style={styles.chart}>
                    {chartImage && <Image src={chartImage} />}
                </View>
            </Page>
        </Document>
    );
};

export default ReportPDF;
