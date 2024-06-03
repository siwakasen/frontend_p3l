import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getLaporan(year) {
    try {
        const token = Cookies.get('token');
        const response = await fetch(`${API_URL}/administrator/laporan/laporan-bulanan/${year}`, {
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
