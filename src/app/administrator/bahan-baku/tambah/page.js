"use client"
import PageContainer from "@/components/container/PageContainer";
import React from "react";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { FormBahanBaku } from "@/components/administrator/bahan-baku/FormBahanBaku";
import { useInsert } from "@/components/administrator/bahan-baku/useBahanBaku";
export default function Page() {
  const {
    bahanBakuInput,
    open,
    handleSubmit,
    handleOpen,
    setBahanBakuInput,
  } = useInsert();

  const modalText ={
    title: "Tambah Bahan Baku",
    description: "Apakah ingin menambahkan data ini?",
    btnText: "Tambah",
  }

  const BCrumb = [
    {
      to: "/administrator/bahan-baku",
      title: "Bahan Baku",
    },
    {
      title: "Tambah",
    },
  ];
  return (
    <PageContainer title="Tambah Hampers" description="Tambah Data Hampers">
      <Breadcrumb title="Hampers" items={BCrumb} />
      <FormBahanBaku
        bahanBakuInput={bahanBakuInput}
        handleSubmit={handleSubmit}
        handleOpen={handleOpen}
        setBahanBakuInput={setBahanBakuInput}
        open={open}
        modalText={modalText}
      />
    </PageContainer>
  );
}
