import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function searchDataCustomer(query) {
    try {
        const token = Cookies.get("token");
        const response = await fetch(`${API_URL}/administrator/data-customer/searchData?query=${query}`, {
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

export async function getDataHistory(id){
    try {
        const token = Cookies.get("token");
        const response = await fetch(`${API_URL}/administrator/data-customer/getDataHistory/${id}`, {
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
