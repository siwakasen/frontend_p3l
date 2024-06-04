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
        width: '33.33%',
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
const keys = [
    1
];

const ReportPDF = ({ laporan, tahun, bulan }) => {
    const printDate = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date());

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text>Atma Kitchen</Text>
                    <Text>Jl. Centralpark No. 10 Yogyakarta</Text>
                </View>

                <View style={styles.section}>
                    <Text style={{ textDecoration: 'underline', marginTop: 5, marginBottom: 5 }}>Laporan Pemasukan dan Pengeluaran</Text>
                    <Text style={{ textDecoration: 'underline', marginTop: 5, marginBottom: 5 }}>Bulan : {`${bulan}`}</Text>
                    <Text style={{ textDecoration: 'underline', marginTop: 5, marginBottom: 5 }}>Tahun : {`${tahun}`}</Text>
                    <Text>Tanggal Cetak: {printDate}</Text>
                </View>
                {laporan.pendapatan && laporan.pengeluaran && (
                    <View style={styles.table} key={keys} >
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCol, styles.tableCellHeader]}></Text>
                            <Text style={[styles.tableCol, styles.tableCellHeader]}>Pemasukan</Text>
                            <Text style={[styles.tableCol, styles.tableCellHeader]}>Pengeluaran</Text>
                        </View>
                        <View style={styles.tableRow} >
                            <Text style={styles.tableCol}>Pendapatan</Text>
                            <Text style={styles.tableCol}>{`${laporan.pendapatan.penjualan}`}</Text>
                            <Text style={styles.tableCol}></Text>
                        </View>
                        <View style={styles.tableRow} >
                            <Text style={styles.tableCol}>Tip</Text>
                            <Text style={styles.tableCol}>{`${laporan.pendapatan.tip}`}</Text>
                            <Text style={styles.tableCol}></Text>
                        </View>
                        <View style={styles.tableRow} >
                            <Text style={styles.tableCol}>Gaji Karyawan</Text>
                            <Text style={styles.tableCol}></Text>
                            <Text style={styles.tableCol}>{`${laporan.pengeluaran.gaji}`}</Text>
                        </View>
                        <View style={styles.tableRow} >
                            <Text style={styles.tableCol}>Bahan Baku</Text>
                            <Text style={styles.tableCol}></Text>
                            <Text style={styles.tableCol}>{`${laporan.pengeluaran.bahan_baku}`}</Text>
                        </View>
                        <View style={styles.tableRow} >
                            <Text style={styles.tableCol}>Pembayaran ke penitip</Text>
                            <Text style={styles.tableCol}></Text>
                            <Text style={styles.tableCol}>{`${laporan.pengeluaran.penitip}`}</Text>
                        </View>
                        {laporan.pengeluaran_lain && laporan.pengeluaran_lain.map((row) => {
                            return (
                                <View style={styles.tableRow} key={row.id_pengeluaran_lain} >
                                    <Text style={styles.tableCol}> {row.nama_pengeluaran}</Text>
                                    <Text style={styles.tableCol}></Text>
                                    <Text style={styles.tableCol}>{row.nominal_pengeluaran}</Text>
                                </View>
                            );
                        })}
                    </View>
                )}

            </Page>
        </Document>
    );
};

export default ReportPDF;
