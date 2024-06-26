import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/shared/Toast";
import Cookies from "js-cookie";
import { login } from "@/services/auth/auth";
import { setUserLogin } from "@/utils/constants";
import { useSelector, useDispatch } from "react-redux";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userLog = useSelector((state) => state.user);
  const { toastSuccess, toastError, toastWarning } = Toast();
  const router = useRouter();

  function handleInput(event) {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  async function handleLogin(event) {
    if (!email || !password) {
      toastWarning("Please fill all the fields!");
      return;
    }

    setLoading(true);

    const karyawan = "Manajer Operasional, Admin, Owner";

    const response = await login(email, password);
    const { message, token, data, key } = response.data;
    switch (response.status) {
      case 200:
        if (data.role != "User" && karyawan.includes(data.role)) {
          Cookies.set("token", token);
          toastSuccess(message);
          router.push("/administrator/dashboard");
        } else if (data.role === "User") {
          Cookies.set("token", token);
          toastSuccess(message);
          dispatch(setUserLogin(data));
          router.push("/");
        } else {
          toastError("Unauthorized account!");
        }
        break;
      case 401:
        if (key === "email_not_verified") {
          toastWarning(message);
          router.push("/auth/email-verification/" + token);
        } else {
          toastError(message);
        }
        break;
      default:
        toastError("Something went wrong!");
        break;
    }
    setLoading(false);
  }
  return { handleLogin, handleInput, loading };
};
