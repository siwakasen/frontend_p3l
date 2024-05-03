"use client"

import { useUpdate } from "@/components/administrator/bahan-baku/useBahanBaku";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { FormBahanBaku } from "@/components/administrator/bahan-baku/FormBahanBaku";
import PageContainer from "@/components/container/PageContainer";
export default function Page({params}) {
  const {id} = params;

  const {
    bahanBakuInput,
    open,
    handleSubmit,
    handleOpen,
    setBahanBakuInput,
  } = useUpdate(id);
  const BCrumb = [
    {
      to: "/administrator/dashboard",
      title: "Administrator",
    },
    {
      to: "/administrator/bahan-baku",
      title: "Bahan Baku",
    },
    {
      title: "Ubah",
    },
  ];
  return (
    <PageContainer title="Ubah Bahan Baku" description={"Ubah Data Bahan Baku"}>
      <Breadcrumb title={"Bahan Baku"} items={BCrumb}></Breadcrumb>
      <FormBahanBaku
        bahanBakuInput={bahanBakuInput}
        handleSubmit={handleSubmit}
        handleOpen={handleOpen}
        setBahanBakuInput={setBahanBakuInput}
        open={open}
        modalText={{
          title: "Ubah Bahan Baku",
          description: "Apakah anda yakin ingin mengubah data ini?",
          btnText: "Ubah",
        }}
        />
    </PageContainer>
  );
}
