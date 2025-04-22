import { cookies } from "next/headers";
import { Header } from "./header";

export default async function HeaderWrapper() {
  const token = (await cookies()).get("access_token")?.value;
  return <Header initialAuthState={!!token} />;
}
