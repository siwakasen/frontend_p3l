import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getProfile() {
    try {
        const response = await fetch(`${API_URL}/customer/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
        });
    
        const res = await response.json();
        return { data: res, status: response.status };
    } catch (error) {
        return error;
    }
}

export async function changeProfile(data) {
    try {
        const response = await fetch(`${API_URL}/customer/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(data),
        });
    
        const res = await response.json();
        return { data: res, status: response.status };
    } catch (error) {
        return error;
    }
}
