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
    const response = await fetch(
      `${API_URL}/administrator/change-password/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
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
    if (!authToken) authToken = Cookies.get("token");
    const response = await fetch(`${API_URL}/auth/token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      const error = new Error();
      error.statusCode = response.status;
      error.status = data.status;
      error.messages = data.message;
      throw error;
    }
    return data;
  } catch (error) {
    const errors = { ...error };
    return errors;
  }
}

export async function requestForgot(email) {
  try {
    const response = await fetch(
      `${API_URL}/customer/reset-password/create-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    return error;
  }
}

export async function submitForgotPassword(email, password, confirm_password) {
  try {
    const res = await fetch(`${API_URL}/customer/reset-password/submit-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password, confirm_password }),
    });
    const data = await res.json();
    return { data, status: res.status };
  } catch (error) {
    return error;
  }
}

export async function validateToken(token) {
  try {
    const res = await fetch(
      `${API_URL}/customer/reset-password/validate/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await res.json();
    return { data, status: res.status };
  } catch (error) {
    return error;
  }
}
