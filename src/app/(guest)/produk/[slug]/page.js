"use client";
import React, { useState, useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import { DetailProduk } from "@/components/user/produk/DetailProduk";
import { searchProduk, getAllProduk } from "@/services/produk/produk";
import { getAllKategori } from "@/services/kategori/kategori";
import { slugToRealName } from "@/utils/constants";

export default function Page({ params }) {
  const { slug } = params;

  const [produk, setProduk] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [kategori, setKategori] = useState([]);
  const [relateds, setRelateds] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await searchProduk(slugToRealName(slug));
      setProduk(response.data);
    }
    async function fetchDataKategori() {
      const response = await getAllKategori();
      setKategori(response.data);
    }
    async function fetchDataProduk() {
      const response = await getAllProduk();
      setRelateds(response.data);
    }

    fetchData()
      .then(() => fetchDataKategori())
      .then(() => fetchDataProduk());
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [slug]);

  function findKategori(id) {
    return kategori.find((item) => item.id_kategori === id);
  }

  return isLoading ? (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <CircularProgress size="4rem" color="primary" />
      </Box>
    </>
  ) : (
    produk && (
      <DetailProduk
        items={produk}
        kategori={findKategori(produk[0].id_kategori)}
        relateds={relateds.filter(
          (item) =>
            item.id_kategori === produk[0].id_kategori &&
            item.nama_produk != produk[0].nama_produk &&
            !item.nama_produk.includes("1/2")
        )}
      />
    )
  );
}
