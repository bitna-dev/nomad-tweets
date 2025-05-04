import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}
const getSession = async () => {
  return getIronSession<SessionContent>(await cookies(), {
    cookieName: "Hello Nomad",
    password: process.env.COOKIE_PW!,
  });
};

export default getSession;
