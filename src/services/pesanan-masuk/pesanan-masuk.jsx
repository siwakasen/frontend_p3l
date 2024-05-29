import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getPesananMasukData() {
    try {
        const token = Cookies.get('token');
        const response = await fetch(`${API_URL}/administrator/pesanan-masuk`, {
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

export async function getPesanan(id) {
    try {
        const token = Cookies.get('token');
        const response = await fetch(`${API_URL}/administrator/pesanan-masuk/${id}`, {
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

export async function updateInputJarak(id, data) {
    try {
        const token = Cookies.get('token');
        const response = await fetch(`${API_URL}/administrator/pesanan-masuk/updateInputJarak/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export async function updateTotalBayar(id, data) {
    try {
        const token = Cookies.get('token');
        const response = await fetch(`${API_URL}/administrator/pesanan-masuk/updateTotalBayar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}