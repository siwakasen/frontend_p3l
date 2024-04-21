import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return error;
  }
}

export async function checkToken(authToken = null) {
  try {
    if (!authToken) {
      authToken = Cookies.get("token");
    }
    const response = await fetch(`${API_URL}/auth/token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
