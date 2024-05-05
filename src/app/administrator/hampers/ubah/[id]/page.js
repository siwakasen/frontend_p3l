"use client";
import PageContainer from "@/components/container/PageContainer";
import React from "react";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { useUpdate } from "@/components/administrator/hampers/useHampers";
import { FormHampers } from "@/components/administrator/hampers/FormHampers";

export default function Page({ params }) {
  const { id } = params;

  const {
    detailInput,
    hampersInput,
    open,
    handleSubmit,
    handleOpen,
    setDetailInput,
    setHampersInput,
  } = useUpdate(id);

  const modalText = {
    title: "Ubah Hampers",
    description: "Apakah anda yakin ingin mengubah data ini?",
    btnText: "Ubah",
  };

  const BCrumb = [
    {
      to: "/administrator/hampers",
      title: "Hampers",
    },
    {
      title: "Ubah",
    },
  ];

  return (
    <PageContainer title="Ubah Hampers" description="Ubah Data Hampers">
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
