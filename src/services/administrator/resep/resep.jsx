import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getAllResepData() {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/resep`, {
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

export async function getResepById(id) {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/resep/${id}`, {
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

export async function addResep(data) {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/resep`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const response = await res.json();
        return response;
    } catch (error) {
        return error;
    }
}

export async function updateResep(id, data) {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/resep/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const response = await res.json();
        return response;
    } catch (error) {
        return error;
    }
}

export async function deleteResep(id) {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/resep/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const response = await res.json();
        return response;
    } catch (error) {
        return error;
    }
}