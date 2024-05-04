import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getAllBahanBaku() {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/bahan-baku`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return error;
    }
}