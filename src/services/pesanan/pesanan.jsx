import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getPesananValid() {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/pesanan/valid`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function konfirmasiPesananMO(id, status) {
  console.log(id, status);
  console.log(JSON.stringify({ status_transaksi: status }));
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/pesanan/konfirmasi/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status_transaksi: status
      }),
    });
    const data = await response.json();
    console.log(response.status);
    return { data, code: response.status };
  } catch (error) {
    return error;
  }
}

export async function getBahanBakuKurang() {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/pesanan/bahan-baku-kurang`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
export async function checkout(dataPesanan, isCart, statusPesanan) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(
      `${API_URL}/customer/pesanan/checkout?${isCart ? "isCart=true&" : ''}&statusPesanan=${statusPesanan}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataPesanan),
      }
    );
    const data = await response.json();
    return { data, code: response.status };
  } catch (error) {
    return error;
  }
}

export async function addToCart(items) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/customer/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(items),
    });
    const data = await response.json();
    return { data, code: response.status };
  } catch (error) {
    return error;
  }
}

export async function getCart() {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/customer/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return { data, code: response.status };
  } catch (error) {
    return error;
  }
}
