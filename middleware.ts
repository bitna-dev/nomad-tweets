import getSession from "@lib/session";
import { NextRequest, NextResponse } from "next/server";

interface Routes {
  [key: string]: boolean;
}
const publicOnlyURL: Routes = {
  "/": true,
  "/login": true,
  "/create-account": true,
};
export const middleware = async (request: NextRequest) => {
  const session = await getSession();
  const exists = publicOnlyURL[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return Response.redirect(new URL("/", request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }
};

// no middleware matches in config
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
