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
    },
    tableCellHeader: {
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold',
    },
    tableCell: {
        padding: 5,
    },
});

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
                    <Text style={{ textDecoration: 'underline', marginTop: 5, marginBottom: 5 }}>Laporan Presensi Karyawan</Text>
                    <Text style={{ textDecoration: 'underline', marginTop: 5, marginBottom: 5 }}>Bulan : {`${bulan}`}</Text>
                    <Text style={{ textDecoration: 'underline', marginTop: 5, marginBottom: 5 }}>Tahun : {`${tahun}`}</Text>
                    <Text>Tanggal Cetak: {printDate}</Text>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Nama</Text>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Jumlah Hadir</Text>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Jumlah Bolos</Text>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Honor Harian</Text>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Bonus Rajin</Text>
                        <Text style={[styles.tableCol, styles.tableCellHeader]}>Total</Text>
                    </View>
                    {laporan && laporan.map((item) => {
                        return (
                            <View style={styles.tableRow} key={item.id_karyawan}>
                                <Text style={styles.tableCol}>{item.nama_karyawan}</Text>
                                <Text style={styles.tableCol}>{item.jumlah_hadir}</Text>
                                <Text style={styles.tableCol}>{item.jumlah_bolos}</Text>
                                <Text style={styles.tableCol}>{item.role.nominal_gaji}</Text>
                                <Text style={styles.tableCol}>{item.bonus_gaji}</Text>
                                <Text style={styles.tableCol}>{item.role.nominal_gaji + item.bonus_gaji}</Text>
                            </View>
                        );
                    })}
                </View>
            </Page>
        </Document>
    );
};

export default ReportPDF;
