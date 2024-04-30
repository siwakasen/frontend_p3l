import  { validateToken }  from "@/services/auth/auth";

export const useValidateToken = () => {
    async function handleCheckToken(token) {
        const response = await validateToken(token);
        return response.status;
    }
    return { handleCheckToken };
};
