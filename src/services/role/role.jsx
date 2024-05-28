import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getAllRoleData() {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/roles`, {
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

export async function getRoleDataById(id) {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/roles/${id}`, {
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

export async function createRoleData(data) {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/roles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        return result;
    } catch (error) {
        return error;
    }
}

export async function updateRoleData(id, data) {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/roles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        return result;
    } catch (error) {
        return error;
    }
}

export async function deleteRoleData(id) {
    try {
        const token = Cookies.get('token');
        const res = await fetch(`${API_URL}/administrator/roles/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await res.json();
        return result;
    } catch (error) {
        return error;
    }
}
