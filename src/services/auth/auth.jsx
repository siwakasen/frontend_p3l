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

export async function register(data) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    return { data: res, status: response.status };
  } catch (error) {
    return error;
  }
}

export async function emailVerification(token, digit) {
  try {
    const response = await fetch(`${API_URL}/auth/verify/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ digit }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function resendCode(token) {
  try {
    const response = await fetch(`${API_URL}/auth/kirim-ulang-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function changePasswordKaryawan(id, data) {
  const token = Cookies.get("token");
  try {
    const response = await fetch(`${API_URL}/administrator/change-password/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
}


export async function emailCheck(email) {
  try {
    const response = await fetch(`${API_URL}/auth/email-check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data.status === true) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return error;
  }
}

export async function checkTokenValidity(token) {
  try {
    const response = await fetch(`${API_URL}/auth/validate-token/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
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
