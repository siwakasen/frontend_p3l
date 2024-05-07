"use client";
import React from "react";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import PageContainer from "@/components/container/PageContainer";
import { useInsert } from "@/components/administrator/produk/useProduk";
import { FormProduk } from "@/components/administrator/produk/FormProduk";

export default function Page() {
  const { handleSubmit, input, setInput, handleOpen, open } = useInsert();
  const modalText = {
    title: "Tambah Produk",
    description: "Apakah anda yakin ingin menambahkan data ini?",
    btnText: "Tambah",
  };

  const BCrumb = [
    {
      to: "/administrator/produk",
      title: "Produk",
    },
    {
      title: "Tambah",
    },
  ];

  return (
    <PageContainer title="Produk" description="Tambah Produk">
      <Breadcrumb title="Produk" items={BCrumb} />
      <FormProduk
        input={input}
        handleSubmit={handleSubmit}
        setInput={setInput}
        handleOpen={handleOpen}
        open={open}
        modalText={modalText}
      />
    </PageContainer>
  );
}
