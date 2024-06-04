import Cookies from "js-cookie";
import dayjs from "dayjs";
import { API_URL } from "@/utils/constants";

export async function getLaporanPenjualanBulananProduk(date = null) {
  try {
    const token = Cookies.get("token");
    const response = await fetch(
      `${API_URL}/administrator/laporan/penjualan-per-bulan?date=${date}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return { data, code: response.status };
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getLaporanStokBahanBaku() {
  try {
    const token = Cookies.get("token");
    const response = await fetch(
      `${API_URL}/administrator/laporan/stok-bahan-baku`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return { data, code: response.status };
  } catch (error) {
    return error;
  }
}
