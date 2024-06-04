import Toast from "@/components/shared/Toast";
import { getLaporan } from "@/services/laporan/laporan-penggunaan-bahan-baku/laporan-penggunaan-bahan-baku";

export const useReport = () => {
    const { toastError } = Toast();

    const handleGetLaporan = async (from, to) => {
        const response = await getLaporan(from, to);
        if (response.status === "error") {
            toastError(response.message);
        }
        return response;
    }

    return { handleGetLaporan };
}