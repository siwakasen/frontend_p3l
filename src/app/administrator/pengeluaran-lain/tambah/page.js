"use client"
import PageContainer from "@/components/container/PageContainer";
import React from "react";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { FormPengeluaranLain } from "@/components/administrator/pengeluaran-lain/FormPengeluaranLain";
import { useInsert } from "@/components/administrator/pengeluaran-lain/usePengeluaranLain";
export default function Page() {
  const {
    pengeluaranLainInput,
    open,
    handleSubmit,
    handleOpen,
    setPengeluaranLainInput,
  } = useInsert();

  const modalText ={
    title: "Tambah Pengeluaran Lain",
    description: "Apakah ingin menambahkan data ini?",
    btnText: "Tambah",
  }

  const BCrumb = [
    {
        to: "/administrator/dashboard",
        title: "Administrator",
    },
    {
      to: "/administrator/pengeluaran-lain",
      title: "Pengeluaran Lain",
    },
    {
      title: "Tambah",
    },
  ];
  return (
    <PageContainer title="Tambah Pengeluaran Lain" description="Tambah Data Pengeluaran Lain">
      <Breadcrumb title="Pengeluaran Lain" items={BCrumb} />
      <FormPengeluaranLain
        pengeluaranLainInput={pengeluaranLainInput}
        handleSubmit={handleSubmit}
        handleOpen={handleOpen}
        setPengeluaranLainInput={setPengeluaranLainInput}
        open={open}
        modalText={modalText}
      />
    </PageContainer>
  );
}
