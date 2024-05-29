"use client";
import React from "react";
import PageContainer from "@/components/container/PageContainer";
import { PembayaranValidHistory } from "@/components/user/pembayaran-valid";

export default function Page() {
  return (
    <PageContainer title="Pembayaran Valid" description="Pembayaran Valid">
      <PembayaranValidHistory />
    </PageContainer>
  );
}
