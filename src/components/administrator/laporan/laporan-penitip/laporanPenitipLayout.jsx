// components/LaporanBulananPdf.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
        width: '16.66%', // Adjusted to fit six columns
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        textAlign: 'center',
        padding: 5,
        fontSize: 16,
    },
    tableCellHeader: {
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold',
    },
    tableCell: {
        padding: 5,
    },
});

const ReportPDF = ({ laporan, tahun, bulan, total }) => {
    console.log(total);
    const printDate = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date());
    const monthName = new Date(tahun, bulan - 1).toLocaleString('id-ID', { month: 'long' });

    return (
        <Document>
            {laporan && laporan.map((item, index) => (
                <Page style={styles.page} key={item.id_penitip}>
                    <View style={styles.section}>
                        <Text>Atma Kitchen</Text>
                        <Text>Jl. Centralpark No. 10 Yogyakarta</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={{ textDecoration: 'underline', marginTop: 5, marginBottom: 5 }}>Laporan Transaksi Penitip</Text>
                        <Text style={{ marginTop: 5, marginBottom: 5 }}>ID Penitip : {`${item.id_penitip}`}</Text>
                        <Text style={{ marginTop: 5, marginBottom: 5 }}>Nama Penitip : {`${item.nama_penitip}`}</Text>
                        <Text style={{ marginTop: 5, marginBottom: 5 }}>Bulan : {`${monthName}`}</Text>
                        <Text style={{ marginTop: 5, marginBottom: 5 }}>Tahun : {`${tahun}`}</Text>
                        <Text>Tanggal Cetak: {printDate}</Text>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCol, styles.tableCellHeader]}>Nama</Text>
                            <Text style={[styles.tableCol, styles.tableCellHeader]}>Qty</Text>
                            <Text style={[styles.tableCol, styles.tableCellHeader]}>Harga Jual</Text>
                            <Text style={[styles.tableCol, styles.tableCellHeader]}>Total</Text>
                            <Text style={[styles.tableCol, styles.tableCellHeader]}>20% Komisi</Text>
                            <Text style={[styles.tableCol, styles.tableCellHeader]}>Yang Diterima</Text>
                        </View>
                        {item.produk && item.produk.map((row) => (
                            <View style={styles.tableRow} key={row.id_produk}>
                                <Text style={styles.tableCol}>{row.nama_produk}</Text>
                                <Text style={styles.tableCol}>{row.Qty}</Text>
                                <Text style={styles.tableCol}>{row.harga_produk}</Text>
                                <Text style={styles.tableCol}>{row.Qty * row.harga_produk}</Text>
                                <Text style={styles.tableCol}>{(row.harga_produk * row.Qty) * 0.2}</Text>
                                <Text style={styles.tableCol}>{(row.harga_produk * row.Qty) - (row.harga_produk * row.Qty) * 0.2}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCol, styles.tableCellHeader]}></Text>
                            <Text style={[styles.tableCol, styles.tableCellHeader]}></Text>
                            <Text style={[styles.tableCol, styles.tableCellHeader]}></Text>
                            <Text style={[styles.tableCol, styles.tableCellHeader]}></Text>
                            <Text style={[styles.tableCol, styles.tableCellHeader]}>Total</Text>
                            <Text style={[styles.tableCol]}>{total[index]}</Text>
                        </View>
                    </View>
                </Page>
            ))}
        </Document>
    );
};

export default ReportPDF;
