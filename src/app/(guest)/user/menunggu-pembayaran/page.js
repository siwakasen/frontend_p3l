"use client";
import React from "react";
import PageContainer from "@/components/container/PageContainer";
import { MenungguPembayaranHistory } from "@/components/user/menunggu-pembayaran";

export default function Page() {
  return (
    <PageContainer title="Histori Pesanan" description="Histori Pesanan">
      <MenungguPembayaranHistory />
    </PageContainer>
  );
}
