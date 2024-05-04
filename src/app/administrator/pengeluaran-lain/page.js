"use client"
import PageContainer from "@/components/container/PageContainer";
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { getAllPengeluaranLain } from "@/services/pengeluaran-lain/pengeluaran-lain";
import { PengeluaranLainSearchTable } from "@/components/administrator/pengeluaran-lain/PengeluaranLainSearchTable";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPengeluaranLain();
      console.log(response.data);
      setData(response.data);
    };
    fetchData();
  }, [loading]);
  
  const headCells = [
    {
      id: "nama_pengeluaran",
      numeric: false,
      disablePadding: false,
      label: "Nama Pengeluaran",
    },
    {
      id: "nominal_pengeluaran",
      numeric: false,
      disablePadding: false,
      label: "Nominal Pengeluaran",
    },
    {
      id: "tanggal_pengeluaran",
      numeric: false,
      disablePadding: false,
      label: "Tanggal Pengeluaran",
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
      title: "Pengeluaran Lain",
    },
  ];

  return (
    <PageContainer title="Pengeluaran Lain" description="Data Pengeluaran Lain">
      <Breadcrumb title="Pengeluaran Lain" items={BCrumb} />
      <PengeluaranLainSearchTable
        data={data}
        headCells={headCells}
        setLoading={setLoading}
        loading={loading}
      />
    </PageContainer>
  );
}
