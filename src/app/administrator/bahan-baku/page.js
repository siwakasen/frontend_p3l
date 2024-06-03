"use client"
import PageContainer from "@/components/container/PageContainer";
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { getAllBahanBaku } from "@/services/bahan-baku/bahanBaku";
import { BahanBakuSearchTable } from "@/components/administrator/bahan-baku/BahanBakuSearchTable";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllBahanBaku();
      console.log(response.data);
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
      id: "stok",
      numeric: false,
      disablePadding: false,
      label: "Stok",
    },
    {
      id: "satuan",
      numeric: false,
      disablePadding: false,
      label: "Satuan",
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
      to: "/administrator/dashboard",
      title: "Administrator",
    },
    {
      title: "Bahan Baku",
    },
  ];

  return (
    <PageContainer title="Bahan Baku" description="Data Bahan Baku">
      <Breadcrumb title="Bahan Baku" items={BCrumb} />
      <BahanBakuSearchTable
        data={data}
        headCells={headCells}
        setLoading={setLoading}
        loading={loading}
      />
    </PageContainer>
  );
}
