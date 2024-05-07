"use client"
import PageContainer from "@/components/container/PageContainer";
import React from "react";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { FormPenitip } from "@/components/administrator/penitip/FormPenitip";
import { useInsert } from "@/components/administrator/penitip/usePenitip";
export default function Page() {
  const {
    penitipInput,
    open,
    handleSubmit,
    handleOpen,
    setPenitipInput,
  } = useInsert();

  const modalText ={
    title: "Tambah Penitip",
    description: "Apakah ingin menambahkan data ini?",
    btnText: "Tambah",
  }

  const BCrumb = [
    {
        to: "/administrator/dashboard",
        title: "Administrator",
    },
    {
      to: "/administrator/penitip",
      title: "Penitip",
    },
    {
      title: "Tambah",
    },
  ];
  return (
    <PageContainer title="Tambah Penitip" description="Tambah Data Penitip">
      <Breadcrumb title="Penitip" items={BCrumb} />
      <FormPenitip
        penitipInput={penitipInput}
        handleSubmit={handleSubmit}
        handleOpen={handleOpen}
        setPenitipInput={setPenitipInput}
        open={open}
        modalText={modalText}
      />
    </PageContainer>
  );
}
