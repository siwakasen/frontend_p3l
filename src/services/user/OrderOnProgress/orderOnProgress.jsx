import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getOrderOnProgress() {
  try {
    const response = await fetch(`${API_URL}/customer/onprogress`, {
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

export async function confirmOrder(id) {
  try {
    const response = await fetch(`${API_URL}/customer/onprogress/confirm/${id}`, {
      method: "PUT",
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
