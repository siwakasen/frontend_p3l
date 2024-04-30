import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getAllKategori() {
  try {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/administrator/kategori`, {
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
