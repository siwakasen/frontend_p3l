import React, { useState, useEffect } from "react";
import Toast from "@/components/shared/Toast";
import { useRouter } from "next/navigation";
import {
  insertProduk,
  updateProduk,
  getSingleProduk,
} from "@/services/produk/produk";

export const useInsert = () => {
  const { toastSuccess, toastError, toastWarning } = Toast();
  const [input, setInput] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleOpen() {
    setOpen(!open);
  }

  function handleInsert(formData) {
    try {
      const { data, code } = insertProduk(formData);
      switch (code) {
        case 201:
          toastSuccess("Data berhasil ditambahkan");
          router.push("/administrator/produk");
          break;
        case 400:
          toastWarning(data.message);
          break;
        default:
          toastError(data.message);
          break;
      }
    } catch (error) {
      toastError("Data gagal ditambahkan");
    }
  }

  function handleSubmit() {
    let formData = new FormData();

    const isEmptyProduk =
      !input.nama_produk ||
      !input.harga_produk ||
      !input.id_resep ||
      !input.id_kategori ||
      !input.foto_produk ||
      !input.deskripsi_produk ||
      !input.stok_produk ||
      !input.id_kategori;

    if (isEmptyProduk || input.length === 0) {
      toastWarning("Data produk tidak boleh kosong");
      setOpen(!open);
      return;
    }

    if (input.harga_produk < 0 || input.stok_produk < 0) {
      toastWarning("Input data tidak boleh kurang dari 0");
      return;
    }

    for (let key in input) {
      formData.append(key, input[key]);
    }

    handleInsert(formData);
  }

  return { input, setInput, open, handleOpen, handleSubmit };
};

export const useDelete = ({ loading, setLoading }) => {
  const { toastSuccess, toastError } = Toast();

  async function handleDelete(id) {
    try {
      const formData = new FormData();
      formData.append("status_produk", 0);
      formData.append("_method", "PUT");
      Array.from(id).map(async (id) => {
        const response = await updateProduk(formData, id);
        const { data, code } = response;
        switch (code) {
          case 200:
            toastSuccess("Data berhasil dihapus");
            break;
          default:
            toastError("Data gagal dihapus");
            break;
        }
      });
    } catch (error) {
      toastError("Data gagal dihapus");
    }
    setLoading(!loading);
  }

  return { handleDelete };
};

export const useUpdate = (id) => {
  const { toastSuccess, toastError, toastWarning } = Toast();
  const [input, setInput] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await getSingleProduk(id);
      response.data.stok_produk = response.data.stok_produk + "";
      if (response.data.id_penitip === null) delete response.data.id_penitip;
      setInput(response.data);
    }
    fetchData();
  }, []);

  function handleOpen() {
    setOpen(!open);
  }

  async function handleUpdate(formData, id) {
    try {
      formData.append("_method", "PUT");
      const { data, code } = await updateProduk(formData, id);
      switch (code) {
        case 200:
          toastSuccess("Data berhasil diubah");
          router.push("/administrator/produk");
          break;
        case 400:
          toastWarning(data.message);
          break;
        default:
          toastError(data.message);
          break;
      }
    } catch (error) {
      toastError("Data gagal diubah");
    }
  }

  function handleSubmit() {
    let formData = new FormData();

    const isEmptyProduk =
      !input.nama_produk ||
      !input.harga_produk ||
      !input.id_kategori ||
      !input.foto_produk ||
      !input.deskripsi_produk ||
      !input.stok_produk ||
      !input.id_kategori;

    if (isEmptyProduk || input.length === 0) {
      toastWarning("Data produk tidak boleh kosong");
      setOpen(!open);
      return;
    }

    if (input.harga_produk < 0 || input.stok_produk < 0) {
      toastWarning("Input data tidak boleh kurang dari 0");
      return;
    }

    for (let key in input) {
      if (key === "foto_produk" && typeof input[key] !== "object") continue;
      formData.append(key, input[key]);
    }

    handleUpdate(formData, id);
  }

  return { input, setInput, open, handleOpen, handleSubmit };
};
