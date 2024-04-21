"use client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkToken } from "@/services/auth/auth";

export async function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const token = cookies().get("token")?.value;
  const data = await checkToken(token);

  if (path.startsWith("/administrator/") && !token) {
    if (data.role == "user")
      return NextResponse.redirect(new URL("/", request.url));

    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (path.startsWith("/auth/") && token) {
    if (data.role == "user")
      return NextResponse.redirect(new URL("/", request.url));

    return NextResponse.redirect(
      new URL("/administrator/dashboard", request.url)
    );
  }
}
export const config = {
  matcher: ["/administrator/:path*", "/auth/:path*"],
};
