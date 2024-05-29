import Toast from "@/components/shared/Toast";
import { konfirmasiPesananMO } from "@/services/pesanan/pesanan";

export const useConfirm = ({ loading, setLoading }) => {
    const { toastSuccess, toastError, toastWarning } = Toast();

    async function handleConfirm(selected, status_transaksi) {
        try {
            Array.from(selected).forEach(async (id) => {
                const { data, code } = await konfirmasiPesananMO(id, status_transaksi);
                if (code === 200) {
                    toastSuccess(data.message);
                    return;
                } else {
                    toastWarning(`${data.message}`);
                }
            });
        } catch (error) {
            toastError(`${data.error}`);
        }
        setLoading(!loading);
    }
    return { handleConfirm };
}
