import React from "react";
import { useAdd } from "./usePembelianBahanBaku";
import { FormPembelianBahanBaku } from "./FormPembelianBahanBaku";

export const TambahPembelianBahanBaku = () => {
  const { handleInput, handleSubmit, input, handleOpen, open } = useAdd();
  const modalText = {
    title: "Tambah Pembelian Bahan Baku",
    description: "Apakah anda yakin ingin menambahkan data ini?",
    btnText: "Tambah",
  };

  return (
    <>
      <FormPembelianBahanBaku
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        handleOpen={handleOpen}
        open={open}
        input={input}
        modalText={modalText}
      />
    </>
  );
};
