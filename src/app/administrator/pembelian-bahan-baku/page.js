"use client";
import PageContainer from "@/components/container/PageContainer";
import { PembelianBahanBaku } from "@/components/administrator/pembelian-bahan-baku/PembelianBahanBaku";
import React from "react";

export default function Page() {
  return (
    <PageContainer
      title="Pembelian Bahan Baku"
      description="Data Pembelian Bahan Baku"
    >
      <PembelianBahanBaku />
    </PageContainer>
  );
}
