import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

//interface定義（TypeScriptのinterface）
interface SessionContent {
  id?: string;
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "control-my-expenses",
    password: process.env.COOKIE_PASSWORD!,
  });
}