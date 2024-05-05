"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { getAllProduk } from "@/services/produk/produk";
import { getAllKategori } from "@/services/kategori/kategori";
import { ProdukSearchTable } from "@/components/administrator/produk/ProdukSearchTable";
import PageContainer from "@/components/container/PageContainer";

export default function Page() {
  const [data, setData] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProduk();
      const res = await getAllKategori();
      setKategori(res.data);
      setData(response.data);
    };
    fetchData();
  }, [loading]);

  const headCells = [
    {
      id: "nama_produk",
      numeric: false,
      disablePadding: false,
      label: "Produk",
    },
    {
      id: "deskripsi_hampers",
      numeric: false,
      disablePadding: false,
      label: "Deskripsi",
    },
    {
      id: "stok_produk",
      numeric: false,
      disablePadding: false,
      label: "Stok",
    },
    {
      id: "harga_produk",
      numeric: false,
      disablePadding: false,
      label: "Harga",
    },
    {
      id: "status_produk",
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
      title: "Produk",
    },
  ];

  return (
    <PageContainer title="Produk" description="Data Produk">
      <Breadcrumb title="Produk" items={BCrumb} />
      <ProdukSearchTable
        data={data}
        kategori={kategori}
        headCells={headCells}
        loading={loading}
        setLoading={setLoading}
      />
    </PageContainer>
  );
}
