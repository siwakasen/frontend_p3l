import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getOrderHistory() {
  try {
    const response = await fetch(`${API_URL}/customer/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const res = await response.json();
    return { data: res.data, status: response.status };
  } catch (error) {
    return error;
  }
}

export async function getDataHistoryByStatus(status) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(
      `${API_URL}/customer/history/search?status=${status}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await response.json();
    return { data: res.data, status: response.status };
  } catch (error) {
    return error;
  }
}
