import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getLaporan(from, to) {
    try {
        const token = Cookies.get('token');
        const response = await fetch(`${API_URL}/administrator/laporan/penggunaan-bahan-baku/${from}/${to}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}
