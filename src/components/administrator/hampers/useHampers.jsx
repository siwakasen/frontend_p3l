import React, { useState, useEffect } from "react";
import {
  insertHampers,
  updateHampers,
  getSingleHampers,
} from "@/services/hampers/hampers";
import Toast from "@/components/shared/Toast";
import { useRouter } from "next/navigation";

export const useInsert = () => {
  const { toastSuccess, toastError, toastWarning } = Toast();
  const [detailInput, setDetailInput] = useState([]);
  const [hampersInput, setHampersInput] = useState({});
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleSubmit() {
    let formData = new FormData();
    let isEmptyDetail;
    detailInput.forEach((item) => {
      if (!item.value || !item.jenis) {
        isEmptyDetail = true;
        return;
      }
    });

    if (isEmptyDetail || detailInput.length === 0) {
      toastWarning("Data hampers atau detail tidak boleh kosong");
      setOpen(!open);
      return;
    }

    for (let key in hampersInput) {
      formData.append(key, hampersInput[key]);
    }

    const details = convertDetail();
    details.forEach((item) => {
      for (let key in item) {
        formData.append(`detail_hampers[][${key}]`, item[key]);
      }
    });

    handleInsert(formData);
  }

  async function handleInsert(formData) {
    try {
      const { data, code } = await insertHampers(formData);
      switch (code) {
        case 201:
          toastSuccess(data.message);
          setDetailInput([]);
          setHampersInput({});
          router.push("/administrator/hampers");
          break;
        default:
          for (let key in data.errors) {
            toastError(data.errors[key][0]);
          }
          break;
      }
    } catch (error) {
      toastError("Data gagal ditambahkan");
    }
    setOpen(!open);
  }

  function convertDetail() {
    return detailInput.map((item) => {
      return { [item.jenis]: item.value };
    });
  }

  function handleOpen() {
    setOpen(!open);
  }

  return {
    detailInput,
    hampersInput,
    open,
    handleSubmit,
    handleOpen,
    setDetailInput,
    setHampersInput,
  };
};

export const useDelete = ({ loading, setLoading }) => {
  const { toastSuccess, toastError } = Toast();

  async function handleDelete(id) {
    try {
      const formData = new FormData();
      formData.append("status_hampers", 0);
      formData.append("_method", "PUT");
      Array.from(id).map(async (id) => {
        const response = await updateHampers(formData, id);
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
  const [detailInput, setDetailInput] = useState([]);
  const [hampersInput, setHampersInput] = useState({});
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await getSingleHampers(id);
      setData(response.data);
      distributeData(response.data);
    }
    fetchData();
  }, []);

  function distributeData(data) {
    const {
      id_hampers,
      nama_hampers,
      harga_hampers,
      deskripsi_hampers,
      foto_hampers,
      detail,
    } = data;
    const { bahan_baku, produk } = detail;

    setHampersInput({
      id_hampers,
      nama_hampers,
      harga_hampers,
      deskripsi_hampers,
      foto_hampers,
    });

    const newBahanBaku = bahan_baku.map((item) => {
      return { jenis: "id_bahan_baku", value: item.id_bahan_baku };
    });

    const newProduk = produk.map((item) => {
      return { jenis: "id_produk", value: item.id_produk };
    });

    setDetailInput([...newProduk, ...newBahanBaku]);
  }

  function handleSubmit() {
    let formData = new FormData();

    let isEmptyDetail;
    detailInput.forEach((item) => {
      if (!item.value || !item.jenis) {
        isEmptyDetail = true;
        return;
      }
    });

    if (
      isEmptyDetail ||
      detailInput.length === 0 ||
      !hampersInput.foto_hampers
    ) {
      toastWarning("Data hampers atau detail tidak boleh kosong");
      setOpen(!open);
      return;
    }

    for (let key in hampersInput) {
      if (key === "foto_hampers" && typeof hampersInput[key] !== "object")
        continue;

      formData.append(key, hampersInput[key]);
    }

    const details = convertDetail();
    details.forEach((item) => {
      for (let key in item) {
        formData.append(`detail_hampers[][${key}]`, item[key]);
      }
    });
    handleUpdate(formData);
  }

  async function handleUpdate(formData) {
    try {
      formData.append("_method", "PUT");
      const response = await updateHampers(formData, id);
      const { data, code } = response;
      switch (code) {
        case 200:
          toastSuccess(data.message);
          router.push("/administrator/hampers");
          break;
        default:
          for (let key in data.errors) {
            toastError(data.errors[key][0]);
          }
          break;
      }
    } catch (error) {
      toastError("Data gagal diubah");
    }
    setOpen(!open);
  }

  function convertDetail() {
    return detailInput.map((item) => {
      return { [item.jenis]: item.value };
    });
  }

  function handleOpen() {
    setOpen(!open);
  }

  return {
    detailInput,
    hampersInput,
    open,
    handleSubmit,
    handleOpen,
    setDetailInput,
    setHampersInput,
  };
};
