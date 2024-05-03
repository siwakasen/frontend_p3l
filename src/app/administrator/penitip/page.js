"use client"
import PageContainer from "@/components/container/PageContainer";
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { getAllPenitip } from "@/services/penitip/penitip";
import { PenitipSearchTable } from "@/components/administrator/penitip/PenitipSearchTable";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPenitip();
      console.log(response.data);
      setData(response.data);
    };
    fetchData();
  }, [loading]);
  
  const headCells = [
    {
      id: "nama_penitip",
      numeric: false,
      disablePadding: false,
      label: "Nama Penitip",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "no_hp",
      numeric: false,
      disablePadding: false,
      label: "Nomer HP",
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
      title: "Penitip",
    },
  ];

  return (
    <PageContainer title="Penitip" description="Data Penitip">
      <Breadcrumb title="Penitip" items={BCrumb} />
      <PenitipSearchTable
        data={data}
        headCells={headCells}
        setLoading={setLoading}
        loading={loading}
      />
    </PageContainer>
  );
}
