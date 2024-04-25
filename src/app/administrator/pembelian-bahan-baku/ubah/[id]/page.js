"use client";
import PageContainer from "@/components/container/PageContainer";
import { UbahPembelianBahanBaku } from "@/components/administrator/pembelian-bahan-baku/UbahPembelianBahanBaku";
import React from "react";

export default function Page({ params }) {
  const { id } = params;
  return (
    <PageContainer
      title="Ubah Pembelian Bahan Baku"
      description="Ubah Data Pembelian Bahan Baku"
    >
      <UbahPembelianBahanBaku id={id} />
    </PageContainer>
  );
}
