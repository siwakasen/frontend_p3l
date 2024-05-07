"use client";
import PageContainer from "@/components/container/PageContainer";
import React from "react";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { FormHampers } from "@/components/administrator/hampers/FormHampers";
import { useInsert } from "@/components/administrator/hampers/useHampers";

export default function Page() {
  const {
    detailInput,
    hampersInput,
    open,
    handleSubmit,
    handleOpen,
    setDetailInput,
    setHampersInput,
  } = useInsert();

  const modalText = {
    title: "Tambah Hampers",
    description: "Apakah anda yakin ingin menambahkan data ini?",
    btnText: "Tambah",
  };

  const BCrumb = [
    {
      to: "/administrator/hampers",
      title: "Hampers",
    },
    {
      title: "Tambah",
    },
  ];
  return (
    <PageContainer title="Tambah Hampers" description="Tambah Data Hampers">
      <Breadcrumb title="Hampers" items={BCrumb} />
      <FormHampers
        detailInput={detailInput}
        hampersInput={hampersInput}
        handleSubmit={handleSubmit}
        handleOpen={handleOpen}
        setDetailInput={setDetailInput}
        setHampersInput={setHampersInput}
        open={open}
        modalText={modalText}
      />
    </PageContainer>
  );
}
