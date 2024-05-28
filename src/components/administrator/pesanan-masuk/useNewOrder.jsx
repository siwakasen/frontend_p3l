import Toast from "@/components/shared/Toast";
import { updateInputJarak, updateTotalBayar } from "@/services/pesanan-masuk/pesanan-masuk";

export const useUpdateJarak = () => {
    const { toastSuccess, toastError } = Toast();

    const handleUpdateJarak = async (id, data) => {
        const response = await updateInputJarak(id, data);
        if (response.status === "success") {
            toastSuccess(response.message);
        } else {
            toastError(response.message);
        }
    }

    return { handleUpdateJarak };
}

export const useUpdateTotalBayar = () => {
    const { toastSuccess, toastError } = Toast();

    const handleUpdateTotalBayar = async (id, data) => {
        const response = await updateTotalBayar(id, data);
        if (response.status === "success") {
            toastSuccess(response.message);
        } else {
            toastError(response.message);
        }
    }

    return { handleUpdateTotalBayar };
}