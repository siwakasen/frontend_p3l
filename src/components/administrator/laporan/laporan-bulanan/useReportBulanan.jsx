import Toast from "@/components/shared/Toast";
import { getLaporan } from "@/services/laporan/laporan-bulanan/laporan-bulanan";

export const useReport = () => {
    const { toastError } = Toast();

    const handleGetLaporan = async (year) => {
        const response = await getLaporan(year);
        if (response.status === "error") {
            toastError(response.message);
        }
        return response;
    }

    return { handleGetLaporan };
}