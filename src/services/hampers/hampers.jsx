import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getAllHampers() {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/hampers`, {
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

export async function insertHampers(formData) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/hampers`, {
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

export async function updateHampers(formData, id) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/hampers/${id}`, {
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

export async function getSingleHampers(id) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/hampers/${id}`, {
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
