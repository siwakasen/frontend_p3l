"use client";
import React from "react";
import PageContainer from "@/components/container/PageContainer";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { FormProduk } from "@/components/administrator/produk/FormProduk";
import { useUpdate } from "@/components/administrator/produk/useProduk";

export default function Page({ params }) {
  const { id } = params;


  const { handleSubmit, input, setInput, handleOpen, open } = useUpdate(id);
  const modalText = {
    title: "Ubah Produk",
    description: "Apakah anda yakin ingin mengubah data ini?",
    btnText: "Ubah",
  };

  const BCrumb = [
    {
      to: "/administrator/produk",
      title: "Produk",
    },
    {
      title: "Ubah",
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
