"use client"

import { useUpdate } from "@/components/administrator/penitip/usePenitip";
import Breadcrumb from "@/layouts/administrator/Shared/breadcrumb/Breadcrumb";
import { FormPenitip } from "@/components/administrator/penitip/FormPenitip";
import PageContainer from "@/components/container/PageContainer";
export default function Page({params}) {
  const {id} = params;

  const {
    penitipInput,
    open,
    handleSubmit,
    handleOpen,
    setPenitipInput,
  } = useUpdate(id);
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
      title: "Ubah",
    },
  ];
  return (
    <PageContainer title="Ubah Penitip" description={"Ubah Data Penitip"}>
      <Breadcrumb title={"Penitip"} items={BCrumb}></Breadcrumb>
      <FormPenitip
        penitipInput={penitipInput}
        handleSubmit={handleSubmit}
        handleOpen={handleOpen}
        setPenitipInput={setPenitipInput}
        open={open}
        modalText={{
          title: "Ubah Penitip",
          description: "Apakah anda yakin ingin mengubah data ini?",
          btnText: "Ubah",
        }}
        />
    </PageContainer>
  );
}
