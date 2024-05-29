import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getAllBahanBaku() {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/bahan-baku`, {
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

export async function getBahanBaku(id) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/bahan-baku/${id}`, {
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

export async function searchBahanBaku(query) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/bahan-baku/search?query=${query}`, {
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

export async function insertBahanBaku(formData) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/bahan-baku`, {
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


export async function updateBahanBaku(id, input) {
  console.log(input);
  try {
    const token = Cookies.get("token");
    console.log(token);
    const response = await fetch(`${API_URL}/administrator/bahan-baku/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nama_bahan_baku: input.nama_bahan_baku,
        stok: input.stok,
        satuan: input.satuan,
      }),
    });
    const data = await response.json();
    console.log(data.data);
    return { data, code: response.status };
  } catch (error) {
    return error;
  }
}

export async function deleteBahanBaku(id) {
  console.log(id);
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/bahan-baku/${id}`, {
      method: "DELETE",
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
