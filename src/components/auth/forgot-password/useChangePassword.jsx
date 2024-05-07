import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/shared/Toast";
import  {submitForgotPassword}  from "@/services/auth/auth";

export const useChangePassword = () => {
    const [password, setPassword] = useState("");
    const [confirm_password, setconfirm_password] = useState("");
    const [loading, setLoading] = useState(false);
    const { toastSuccess, toastError, toastWarning } = Toast();
    const router = useRouter();

    function handleInput(event) {
     const { name, value } = event.target;
     if (name === "password") {
       setPassword(value);
     } else if (name === "confirm_password") {
       setconfirm_password(value);
     }
    }

    async function handleChangePassword(email) {
        if(!password || !confirm_password){
            toastWarning("Please fill all the fields!");
            return;
        }else if(password !== confirm_password){
            toastWarning("Passwords do not match!");
            return;
        }else if(password.length < 8){
            toastWarning("Password must be at least 8 characters!");
            return;
        }

        setLoading(true);
        const response = await submitForgotPassword(email, password, confirm_password);
        const { message } = response.data;
        switch (response.status) {
            case 200:
                toastSuccess(message);
                router.push('/auth/login');
                break;
            case 400:
                toastError(message);
                break;
            case 404:
                toastError(message);
                break;
            default:
                toastError("Something went wrong!");
                break;
        }
        setLoading(false);

    }
    return { handleInput, handleChangePassword, loading };
};

