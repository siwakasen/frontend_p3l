import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/shared/Toast";
import  {requestForgot}  from "@/services/auth/auth";


export const useRequestForgot = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { toastSuccess, toastError, toastWarning } = Toast();
    const router = useRouter();
    
    function handleInput(event) {
        const { name, value } = event.target;
        if (name === "email") {
        setEmail(value);
        }
    }
    
    async function handleRequestForgot(event) {
        if (!email) {
        toastWarning("Please fill all the fields!");
            return;
        }else 
        if(!email.includes('@')){
            toastWarning("Please enter a valid email address!");
            return;
        }

        setLoading(true);
        const response = await requestForgot(email);
        const { message} = response.data;
        switch (response.status) {
            case 200:
                toastSuccess(message);
                router.push({
                    pathname:"/auth/forgot-password/change-password",
                    query:{isEmailSent:true}
                });
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
    return { handleRequestForgot, handleInput, loading };
}
