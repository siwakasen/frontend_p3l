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

const ReportPDF = ({ laporan }) => {
  const printDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
  }).format(new Date());

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
            Laporan Bahan Baku
          </Text>
          <Text>Tanggal Cetak: {printDate}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>
              Nama Bahan Baku
            </Text>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>
              Satuan
            </Text>
            <Text style={[styles.tableCol, styles.tableCellHeader]}>Stok</Text>
          </View>
          {laporan &&
            laporan.map((item) => {
              return (
                <View style={styles.tableRow} key={item.id_bahan_baku}>
                  <Text style={styles.tableCol}>{item.nama_bahan_baku}</Text>
                  <Text style={styles.tableCol}>{item.satuan}</Text>
                  <Text style={styles.tableCol}>{item.stok}</Text>
                </View>
              );
            })}
        </View>
      </Page>
    </Document>
  );
};

export default ReportPDF;
