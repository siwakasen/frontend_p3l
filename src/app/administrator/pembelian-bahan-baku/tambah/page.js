"use client";
import PageContainer from "@/components/container/PageContainer";
import { TambahPembelianBahanBaku } from "@/components/administrator/pembelian-bahan-baku/TambahPembelianBahanBaku";
import React from "react";

export default function Page() {
  return (
    <PageContainer
      title="Tambah Pembelian Bahan Baku"
      description="Tambah Data Pembelian Bahan Baku"
    >
      <TambahPembelianBahanBaku />
    </PageContainer>
  );
}
