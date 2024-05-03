import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getAllPenitip() {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/penitip`, {
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

export async function getPenitip(id){
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/penitip/${id}`, {
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

export async function searchPenitip(query){
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/penitip/search?query=${query}`, {
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

export async function insertPenitip(formData){
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/penitip`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function updatePenitip(id, input){
  console.log(input);
  try {
    const token = Cookies.get("token");
    console.log(token);
    const response = await fetch(`${API_URL}/administrator/penitip/${id}`, {
      method: "PUT",
      headers: {  
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nama_penitip: input.nama_penitip,
        no_hp: input.no_hp,
        email: input.email,
      }),
    });
    const data = await response.json();
    console.log(data.data);
    return { data, code: response.status };
  }catch (error){
    return error;
  }
}

export async function deletePenitip(id){
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/penitip/${id}`, {
      method: "DELETE",
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
