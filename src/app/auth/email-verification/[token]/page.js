"use client";
import React, { useState, useEffect } from "react";
import PageContainer from "@/components/container/PageContainer";
import { Verification } from "@/components/auth/emailVerification/Verification";
import { checkTokenValidity } from "@/services/auth/auth";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();
  const [isValidToken, setIsValidToken] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function validateToken() {
      try {
        const response = await checkTokenValidity(params.token);
        setEmail(response.email);
        setIsValidToken(response.status);
      } catch (error) {
        console.error("Error validating token:", error);
        setIsValidToken(false);
      } finally {
        setIsLoading(false); 
      }
    }

    validateToken();
  }, [params.token]);

  useEffect(() => {
    if (!isValidToken && !isLoading) {
      router.push('/auth/login');
    }
  }, [isValidToken, isLoading, router]);

  if (isLoading) {
    return null;
  }

  if (!isValidToken) {
    return null;
  }

  return (
    <PageContainer title="Verifikasi Email" description="Authentication Email Verification">
      <Verification token={params.token} email={email} />
    </PageContainer>
  );
}
