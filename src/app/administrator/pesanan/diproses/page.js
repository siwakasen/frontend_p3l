"use client";
import React, { useState, useEffect } from "react";
import PageContainer from "@/components/container/PageContainer";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { getPesananDiprosesHariIni } from "@/services/pesanan/pesanan";
import { PesananDiproses } from "@/components/administrator/pesanan-diproses/PesananDiprosesSearchTable";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPesananDiprosesHariIni();
      setData(response.data.data);
      setLoading(false);
    };

    fetchData();
  }, [loading]);

  const headCells = [
    {
      id: "no_nota",
      numeric: false,
      disablePadding: false,
      label: "No Nota",
    },
    {
      id: "tanggal_pesanan",
      numeric: false,
      disablePadding: false,
      label: "Tanggal Pesanan",
    },
    {
      id: "tanggal_pembayaran",
      numeric: false,
      disablePadding: false,
      label: "Tanggal Pembayaran",
    },
    {
      id: "tanggal_diambil",
      numeric: false,
      disablePadding: false,
      label: "Tanggal Diambil",
    },
  ];

  const BCrumb = [
    {
      to: "/administrator/dashboard",
      title: "Administrator",
    },
    {
      to: "/administrator/dashboard",
      title: "Pesanan",
    },
    {
      title: "Diproses",
    },
  ];

  console.log(data);

  return (
    <PageContainer title="Pesanan" description="Data Pesanan">
      <Breadcrumb title="Pesanan" items={BCrumb} />
      <PesananDiproses
        data={data}
        headCells={headCells}
        setLoading={setLoading}
      />
    </PageContainer>
  );
}
