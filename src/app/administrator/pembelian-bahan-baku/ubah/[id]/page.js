"use client";
import PageContainer from "@/components/container/PageContainer";
import { FormPembelianBahanBaku } from "@/components/administrator/pembelian-bahan-baku/FormPembelianBahanBaku";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { useEdit } from "@/components/administrator/pembelian-bahan-baku/usePembelianBahanBaku";
import React from "react";

export default function Page({ params }) {
  const { id } = params;
  const { handleInput, handleSubmit, input, handleOpen, open } = useEdit(id);

  const modalText = {
    title: "Ubah Pembelian Bahan Baku",
    description: "Apakah anda yakin ingin mengubah data ini?",
    btnText: "Ubah",
  };

  const BCrumb = [
    {
      to: "/administrator/pembelian-bahan-baku",
      title: "Pembelian Bahan Baku",
    },
    {
      title: "Ubah",
    },
  ];

  return (
    <PageContainer
      title="Ubah Pembelian Bahan Baku"
      description="Ubah Data Pembelian Bahan Baku"
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
