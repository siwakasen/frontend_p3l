import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getAllKaryawanData() {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/karyawan`, {
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

export async function getKaryawanById(id) {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/karyawan/${id}`, {
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

export async function addKaryawan(data) {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/karyawan`, {
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

export async function updateKaryawan(id, data) {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/karyawan/${id}`, {
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

export async function deleteKaryawan(id) {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/karyawan/${id}`, {
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