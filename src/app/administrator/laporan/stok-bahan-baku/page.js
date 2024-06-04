"use client";
import React, { useState, useEffect } from "react";
import { getLaporanStokBahanBaku } from "@/services/laporan/laporan";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/container/PageContainer";
import { StokBahanBaku } from "@/components/administrator/laporan/stok-bahan-baku/StokBahanBaku";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLaporanStokBahanBaku();
      setData(response.data.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const BCrum = [
    {
      title: "Dashboard",
      to: "/administrator/laporan/stok-bahan-baku",
    },
    { title: "Stok Bahan Baku" },
  ];

  const headCells = [
    {
      id: "bahan baku",
      numeric: false,
      disablePadding: false,
      label: "Bahan Baku",
    },
    {
      id: "satuan",
      numeric: false,
      disablePadding: false,
      label: "Satuan",
    },
    {
      id: "stok",
      numeric: false,
      disablePadding: false,
      label: "Stok",
    },
  ];

  console.log(data);

  return typeof newArray == undefined ? (
    <div>Loading...</div>
  ) : (
    <PageContainer
      title="Laporan Stok Bahan Baku"
      description="Laporan Stok Bahan Baku"
    >
      <Breadcrumb title="Laporan" items={BCrum} />
      <StokBahanBaku data={data} headCells={headCells} />
    </PageContainer>
  );
}
