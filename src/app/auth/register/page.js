"use client";
import React from "react";
import PageContainer from "@/components/container/PageContainer";
import { Register } from "@/components/auth/register/Register";

export default function Page() {
  return (
    <PageContainer title="Register" description="Authentication Register">
      <Register />
    </PageContainer>
  );
}
