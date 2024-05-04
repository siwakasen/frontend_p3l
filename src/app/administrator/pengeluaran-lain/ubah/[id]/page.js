"use client"

import { useUpdate } from "@/components/administrator/pengeluaran-lain/usePengeluaranLain";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { FormPengeluaranLain } from "@/components/administrator/pengeluaran-lain/FormPengeluaranLain";
import PageContainer from "@/components/container/PageContainer";
export default function Page({params}) {
  const {id} = params;
  const today = new Date();

  const {
    pengeluaranLainInput,
    open,
    handleSubmit,
    handleOpen,
    setPengeluaranLainInput,
  } = useUpdate(id);

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
      title: "Ubah",
    },
  ];
  return (
    <PageContainer title="Ubah Pengeluaran Lain" description={"Ubah Data Pengeluaran Lain"}>
      <Breadcrumb title={"Pengeluaran Lain"} items={BCrumb}></Breadcrumb>
      <FormPengeluaranLain
        pengeluaranLainInput={pengeluaranLainInput}
        handleSubmit={handleSubmit}
        handleOpen={handleOpen}
        setPengeluaranLainInput={setPengeluaranLainInput}
        open={open}
        modalText={{
          title: "Ubah Pengeluaran Lain",
          description: "Apakah anda yakin ingin mengubah data ini?",
          btnText: "Ubah",
        }}
        />
    </PageContainer>
  );
}
