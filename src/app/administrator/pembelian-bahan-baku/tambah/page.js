"use client";
import PageContainer from "@/components/container/PageContainer";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { FormPembelianBahanBaku } from "@/components/administrator/pembelian-bahan-baku/FormPembelianBahanBaku";
import { useAdd } from "@/components/administrator/pembelian-bahan-baku/usePembelianBahanBaku";
import React from "react";

export default function Page() {
  const { handleInput, handleSubmit, input, handleOpen, open } = useAdd();
  const modalText = {
    title: "Tambah Pembelian Bahan Baku",
    description: "Apakah anda yakin ingin menambahkan data ini?",
    btnText: "Tambah",
  };

  const BCrumb = [
    {
      to: "/administrator/pembelian-bahan-baku",
      title: "Pembelian Bahan Baku",
    },
    {
      title: "Tambah",
    },
  ];

  return (
    <PageContainer
      title="Tambah Pembelian Bahan Baku"
      description="Tambah Data Pembelian Bahan Baku"
    >
      <Breadcrumb title="Pembelian Bahan Baku" items={BCrumb} />
      <FormPembelianBahanBaku
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        handleOpen={handleOpen}
        open={open}
        input={input}
        modalText={modalText}
      />
    </PageContainer>
  );
}
