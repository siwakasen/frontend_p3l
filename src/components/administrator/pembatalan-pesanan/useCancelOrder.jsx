import Toast from "@/components/shared/Toast";
import { updateStatusPesanan } from "@/services/pembatalan-pesanan/pembatalan-pesanan";

export const useUpdateStatusPesanan = () => {
    const { toastSuccess, toastError } = Toast();

    const handleUpdateStatusPesanan = async (id, data) => {
        const response = await updateStatusPesanan(id, data);
        if (response.status === "success") {
            toastSuccess(response.message);
        } else {
            toastError(response.message);
        }
    }

    return { handleUpdateStatusPesanan };
}