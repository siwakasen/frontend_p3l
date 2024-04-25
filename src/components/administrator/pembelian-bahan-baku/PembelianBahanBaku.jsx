import React, { useState, useEffect } from "react";
import { getAllPembelianBahanBaku } from "@/services/pembelian-bahan-baku/pembelianBahanBaku";
import { PembelianTableSearch } from "@/components/administrator/pembelian-bahan-baku/PembelianSearchTable";

export const PembelianBahanBaku = () => {
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

  return (
    <div>
      <PembelianTableSearch
        data={data.reverse()}
        headCells={headCells}
        setLoading={setLoading}
        loading={loading}
      />
    </div>
  );
};
