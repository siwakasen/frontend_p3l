import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { checkToken } from "@/services/auth/auth";

export async function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const token = cookies().get("token")?.value;
  const data = await checkToken(token);

  if (path.startsWith("/administrator/") && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  

  if (path.startsWith("/administrator/") && data.data.role === "User") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (path.startsWith("/auth/") && token) {
    if (data.data.role === "User")
      return NextResponse.redirect(new URL("/", request.url));

    return NextResponse.redirect(
      new URL("/administrator/dashboard", request.url)
    );
  }
}
export const config = {
  matcher: ["/administrator/:path*", "/auth/:path*"],
};
