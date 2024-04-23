"use client";
import { API_URL } from "@/utils/constants";

export async function getDashboardData() {
    const token = "2|rUcwr7XvxXfcvboRwann5vvKnhlB5tdSPDQz1tuM4ef63c68";
    const res = await fetch(`${API_URL}/administrator`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

