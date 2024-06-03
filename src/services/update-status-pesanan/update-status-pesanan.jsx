import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getPesananData() {
    try {
        const token = Cookies.get('token');
        const response = await fetch(`${API_URL}/administrator/update-status-pesanan`, {
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

export async function updateStatusPesanan(id, data) {
    try {
        const token = Cookies.get('token');
        const response = await fetch(`${API_URL}/administrator/update-status-pesanan/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    } catch (error) {
        return error;
    }
}