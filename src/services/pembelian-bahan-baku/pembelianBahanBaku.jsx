import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function addPembelianBahanBaku(inputData) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(
      `${API_URL}/administrator/pembelian-bahan-baku`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(inputData),
      }
    );

    const data = await response.json();

    return { data, code: response.status };
  } catch (error) {
    return error;
  }
}

export async function getAllPembelianBahanBaku() {
  try {
    const token = Cookies.get("token");
    const response = await fetch(
      `${API_URL}/administrator/pembelian-bahan-baku`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function deletePembelianBahanBaku(id) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(
      `${API_URL}/administrator/pembelian-bahan-baku/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getSinglePembelianBahanBaku(id) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(
      `${API_URL}/administrator/pembelian-bahan-baku/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function updatePembelianBahanBaku(inputData) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(
      `${API_URL}/administrator/pembelian-bahan-baku/${inputData.id_pembelian}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_bahan_baku: inputData.id_bahan_baku,
          jumlah: inputData.jumlah,
          harga: inputData.harga,
          tanggal_pembelian: inputData.tanggal_pembelian,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    return { data, code: response.status };
  } catch (error) {
    return error;
  }
}
