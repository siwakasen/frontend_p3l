"use client";
import PageContainer from "@/components/container/PageContainer";
import React, { useState, useEffect } from "react";
import { getAllHampers } from "@/services/hampers/hampers";
import { HampersSearchTable } from "@/components/administrator/hampers/HampersSearchTable";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllHampers();
      console.log(response.data);
      setData(response.data);
    };
    fetchData();
  }, [loading]);

  const headCells = [
    {
      id: "nama_hampers",
      numeric: false,
      disablePadding: false,
      label: "Hampers",
    },
    {
      id: "isi_produk",
      numeric: false,
      disablePadding: false,
      label: "Isi Hampers",
    },
    {
      id: "harga_hampers",
      numeric: false,
      disablePadding: false,
      label: "Harga",
    },
    {
      id: "status_hampers",
      numeric: false,
      disablePadding: false,
      label: "Status",
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
      title: "Hampers",
    },
  ];

  return (
    <PageContainer title="Hampers" description="Data Hampers">
      <Breadcrumb title="Hampers" items={BCrumb} />
      <HampersSearchTable
        data={data.filter((item) => item.status_hampers === filter)}
        headCells={headCells}
        setLoading={setLoading}
        loading={loading}
        setFilter={setFilter}
        filter={filter}
      />
    </PageContainer>
  );
}