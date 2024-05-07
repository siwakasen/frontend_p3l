"use client";
import PageContainer from "@/components/container/PageContainer";
import { getAllPembelianBahanBaku } from "@/services/pembelian-bahan-baku/pembelianBahanBaku";
import { PembelianTableSearch } from "@/components/administrator/pembelian-bahan-baku/PembelianSearchTable";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { useState, useEffect } from "react";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPembelianBahanBaku();
      setData(response.data);
    };
    fetchData();
  }, [loading]);

  const headCells = [
    {
      id: "nama_bahan_baku",
      numeric: false,
      disablePadding: false,
      label: "Bahan Baku",
    },
    {
      id: "tanggal_pembelian",
      numeric: false,
      disablePadding: false,
      label: "Tanggal Pembelian",
    },
    {
      id: "jumlah",
      numeric: false,
      disablePadding: false,
      label: "Jumlah",
    },
    {
      id: "harga",
      numeric: false,
      disablePadding: false,
      label: "Harga",
    },
    {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
    },
  ];

  const BCrumb = [
    {
      title: "Pembelian Bahan Baku",
    },
  ];

  return (
    <PageContainer
      title="Pembelian Bahan Baku"
      description="Data Pembelian Bahan Baku"
    >
      <Breadcrumb title="Pembelian Bahan Baku" items={BCrumb} />
      <PembelianTableSearch
        data={data.reverse()}
        headCells={headCells}
        setLoading={setLoading}
        loading={loading}
      />
    </PageContainer>
  );
}
