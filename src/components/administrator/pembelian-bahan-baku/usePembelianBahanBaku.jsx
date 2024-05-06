import { useState, useEffect } from "react";
import {
  deletePembelianBahanBaku,
  addPembelianBahanBaku,
  getSinglePembelianBahanBaku,
  updatePembelianBahanBaku,
} from "@/services/pembelian-bahan-baku/pembelianBahanBaku";
import Toast from "@/components/shared/Toast";
import { useRouter } from "next/navigation";

const useDelete = ({ setLoading, loading }) => {
  const { toastSuccess, toastError } = Toast();

  async function handleDelete(id) {
    try {
      Array.from(id).map(async (id) => {
        const response = await deletePembelianBahanBaku(id);
        const { message, data, status } = response;
        if (status) {
          toastSuccess(message);
        } else {
          toastError(message);
        }
      });
    } catch (error) {
      return error;
    }
    setLoading(!loading);
  }
  return { handleDelete };
};

const useAdd = () => {
  const { toastSuccess, toastError, toastWarning } = Toast();
  const [input, setInput] = useState({});
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  function handleOpen() {
    setOpen(!open);
  }

  async function handleSubmit() {
    await handleAdd();
    handleOpen();
  }

  async function handleAdd() {
    try {
      const response = await addPembelianBahanBaku(input);
      const { data, code } = response;
      switch (code) {
        case 201:
          toastSuccess(data.message);
          setInput({});
          router.push("/administrator/pembelian-bahan-baku");
          break;
        default:
          for (let key in data.errors) {
            toastError(data.errors[key][0]);
          }
          break;
      }
    } catch (error) {
      return error;
    }
  }
  return { handleSubmit, handleInput, input, handleOpen, open };
};

const useEdit = (id) => {
  const { toastSuccess, toastError, toastWarning } = Toast();
  const [input, setInput] = useState({});
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await getSinglePembelianBahanBaku(id);
      setInput(response.data);
    }
    fetchData();
  }, []);

  const handleInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  function handleOpen() {
    setOpen(!open);
  }

  async function handleSubmit() {
    await handleEdit();
    handleOpen();
  }

  async function handleEdit() {
    try {
      const response = await updatePembelianBahanBaku(input);
      const { data, code } = response;
      switch (code) {
        case 200:
          toastSuccess("Data berhasil diubah");
          setInput({});
          router.push("/administrator/pembelian-bahan-baku");
          break;
        default:
          for (let key in data.errors) {
            toastError(data.errors[key][0]);
          }
          break;
      }
    } catch (error) {
      return error;
    }
  }
  return { handleSubmit, handleInput, input, handleOpen, open };
};

export { useDelete, useAdd, useEdit };
