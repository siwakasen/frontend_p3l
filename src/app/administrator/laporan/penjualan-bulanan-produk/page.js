"use client";
import React, { useState, useEffect } from "react";
import { PenjualanBulananProduk } from "@/components/administrator/laporan/penjualan-bulanan-produk/PenjualanBulananProduk";
import { getLaporanPenjualanBulananProduk } from "@/services/laporan/laporan";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/container/PageContainer";
import dayjs from "dayjs";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLaporanPenjualanBulananProduk(date);
      setData(response.data.data);
      setLoading(false);
    };

    fetchData();
  }, [date]);

  const BCrum = [
    {
      title: "Dashboard",
      to: "/administrator/laporan/penjualan-bulanan-produk",
    },
    { title: "Penjualan Bulanan Per Produk" },
  ];

  const headCells = [
    {
      id: "produk",
      numeric: false,
      disablePadding: false,
      label: "Produk",
    },
    {
      id: "kuantitas",
      numeric: false,
      disablePadding: false,
      label: "Kuantitas",
    },
    {
      id: "harga",
      numeric: false,
      disablePadding: false,
      label: "Harga",
    },
    {
      id: "jumlah uang",
      numeric: false,
      disablePadding: false,
      label: "Jumlah Uang",
    },
  ];

  const newArray = data?.produk?.concat(data?.hampers);

  return typeof newArray == undefined ? (
    <div>Loading...</div>
  ) : (
    <PageContainer
      title="Laporan Penjualan Bulanan Per Produk"
      description="Laporan Penjualan Bulanan Per Produk"
    >
      <Breadcrumb title="Laporan" items={BCrum} />
      <PenjualanBulananProduk
        data={newArray}
        headCells={headCells}
        date={date}
        setDate={setDate}
      />
    </PageContainer>
  );
}
