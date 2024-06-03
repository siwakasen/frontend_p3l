import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";


export async function getPenarikanSaldo() {
    try {
        const token = Cookies.get("token");
        const response = await fetch(`${API_URL}/administrator/penarikan-saldo`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}

export async function confirmPenarikanSaldo(id) {
    try {
        const token = Cookies.get("token");
        const response = await fetch(`${API_URL}/administrator/penarikan-saldo/konfirmasi/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return { data, code: response.status };

    } catch (error) {
        return error;
    }
}
