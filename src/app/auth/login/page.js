"use client";
import React from "react";
import PageContainer from "@/components/container/PageContainer";
import { Login } from "@/components/auth/login/Login";

export default function Page() {
  return (
    <PageContainer title="Login" description="Authentication Login">
      <Login />
    </PageContainer>
  );
}
