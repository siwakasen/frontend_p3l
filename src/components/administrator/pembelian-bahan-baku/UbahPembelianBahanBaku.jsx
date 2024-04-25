import React from "react";
import { useEdit } from "./usePembelianBahanBaku";
import { FormPembelianBahanBaku } from "./FormPembelianBahanBaku";

export const UbahPembelianBahanBaku = ({ id }) => {
  const { handleInput, handleSubmit, input, handleOpen, open } = useEdit(id);

  const modalText = {
    title: "Ubah Pembelian Bahan Baku",
    description: "Apakah anda yakin ingin mengubah data ini?",
    btnText: "Ubah",
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
