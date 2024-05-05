import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getAllProduk() {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/produk`, {
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

export async function getSingleProduk(id) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/produk/${id}`, {
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

export async function insertProduk(formData) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/produk`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    return { data, code: response.status };
  } catch (error) {
    return error;
  }
}

export async function updateProduk(formData, id) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/produk/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    return { data, code: response.status };
  } catch (error) {
    return error;
  }
}
