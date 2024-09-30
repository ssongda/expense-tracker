import { NextRequest, NextResponse } from "next/server";
import getSession from "@/lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/create-account": true,
  "/expences": true,
  "/github/start": true,
  "/github/complete": true,
  "/profile": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  console.log("middle?", session)
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};