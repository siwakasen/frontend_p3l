import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColSpan: {
    width: "75%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderTopWidth: 0,
    textAlign: "center",
    padding: 8,
    fontSize: 12,
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "center",
    padding: 5,
  },
  tableCellHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  tableCell: {
    padding: 5,
  },
});

const ReportPDF = ({ laporan, tahun, bulan }) => {
  const printDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
  }).format(new Date());
  const totalSubtotal = laporan?.reduce(
    (acc, item) =>
      acc + (item.harga_produk ?? item.harga_hampers) * item.jumlah,
    0
  );

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>Atma Kitchen</Text>
          <Text>Jl. Centralpark No. 10 Yogyakarta</Text>
        </View>

        <View style={styles.section}>
          <Text
            style={{
              textDecoration: "underline",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            Laporan Penjualan Bulanan Per Produk
          </Text>
          <Text
            style={{
              textDecoration: "underline",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            Bulan : {`${bulan}`}
          </Text>
          <Text
            style={{
              textDecoration: "underline",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            Tahun : {`${tahun}`}
          </Text>
          <Text>Tanggal Cetak: {printDate}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>
              Produk
            </Text>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>
              Kuantitas
            </Text>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>Harga</Text>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>
              Jumlah Uang
            </Text>
          </View>
          {laporan &&
            laporan.map((item, index) => {
              return (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableCol}>
                    {item.nama_produk ?? item.nama_hampers}
                  </Text>
                  <Text style={styles.tableCol}>{item.jumlah}</Text>
                  <Text style={styles.tableCol}>
                    {formatRupiah(item.harga_produk ?? item.harga_hampers)}
                  </Text>
                  <Text style={styles.tableCol}>
                    {formatRupiah(
                      (item.harga_produk ?? item.harga_hampers) * item.jumlah
                    )}
                  </Text>
                </View>
              );
            })}
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableColSpan, styles.totalRow]}>Total</Text>
          <Text style={[styles.tableCol, styles.totalRow]}>
            {formatRupiah(totalSubtotal)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReportPDF;
