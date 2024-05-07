import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getAllPengeluaranLain() {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/pengeluaran-lain`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getPengeluaranLain(id){
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/pengeluaran-lain/${id}`, {
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

export async function searchPengeluaranLain(query){
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/pengeluaran-lain/search?query=${query}`, {
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

export async function insertPengeluaranLain(formData){
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/pengeluaran-lain`, {
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

export async function updatePengeluaranLain(id, input){
  console.log(input);
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/pengeluaran-lain/${id}`, {
      method: "PUT",
      headers: {  
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nama_pengeluaran: input.nama_pengeluaran,
        nominal_pengeluaran: input.nominal_pengeluaran,
        tanggal_pengeluaran: input.tanggal_pengeluaran,
      }),
    });
    const data = await response.json();
    console.log(data.data);
    return { data, code: response.status };
  }catch (error){
    return error;
  }
}

export async function updateStatusPengeluaranLain(id){
  try {

    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/pengeluaran-lain/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return { data, code: response.status };
  } catch (error) {
    return error;
  }
}

export async function deletePengeluaranLain(id){
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/pengeluaran-lain/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return {data, code: response.status};
  } catch (error) {
    return error;
  }
}
