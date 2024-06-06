import Toast from "@/components/shared/Toast";
import { confirmPenarikanSaldo } from "@/services/penaraikan-saldo/penarikan-saldo";

export const useConfirm = ({ loading, setLoading }) => {
  const { toastSuccess, toastError } = Toast();

  async function handleConfirm(id) {
    try {
      Array.from(id).forEach(async (id) => {
        const { data, code } = await confirmPenarikanSaldo(id);
        if (code === 200) {
          toastSuccess(data.message);
          return;
        } else {
          toastError(data.message);
        }
      });
    } catch (error) {
      toastError(data.message);
    }
    setLoading(!loading);
  }
  return { handleConfirm };
};
