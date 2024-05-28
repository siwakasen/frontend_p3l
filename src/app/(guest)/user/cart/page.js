"use client";
import React from "react";
import { Cart } from "@/components/user/cart/Cart";
import PageContainer from "@/components/container/PageContainer";
import { CartHistory } from "@/components/user/cart";

export default function Page() {
  return (
    <PageContainer title="Profil" description="Profil">
      <CartHistory />
    </PageContainer>
  );
}
