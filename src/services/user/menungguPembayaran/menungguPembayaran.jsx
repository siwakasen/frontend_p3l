import { API_URL } from "@/utils/constants";
import Cookies from "js-cookie";

export async function getPesananBelumDibayar() {
    try {
        const response = await fetch(`${API_URL}/customer/pesanan/belum-bayar`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });

        const res = await response.json();
        console.log(res);
        return { data: res.data, status: response.status };
    } catch (error) {
        return error;
    }
}

export async function bayarPesanan(id, image) {
    const formData = new FormData();
    console.log(image);
    formData.append('bukti_pembayaran', image);
    try {
        const response = await fetch(`${API_URL}/customer/pesanan/bayar/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: formData,
        });
        const res = await response.json();
        console.log(res);
        return { message: res.message, status: response.status };
    } catch (error) {
        return error;
    }
}
