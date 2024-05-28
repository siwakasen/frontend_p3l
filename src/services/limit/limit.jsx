import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function insertLimit(inputData) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/limit-produk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputData),
    });
    const data = await response.json();
    return { data, code: response.status };
  } catch (error) {
    return error;
  }
}

export async function getLimitById(id) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(
      `${API_URL}/administrator/limit-produk/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return { data: data.data, code: response.status };
  } catch (error) {
    return error;
  }
}

export async function getLimitByDate(date) {
  try {
    const response = await fetch(
      `${API_URL}/administrator/limit-produk/search?date=${date}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return { data: data.data, code: response.status };
  } catch (error) {
    return error;
  }
}

export async function updateLimit(inputData, id) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(
      `${API_URL}/administrator/limit-produk/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
