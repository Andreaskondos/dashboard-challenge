import { getCurrentUser } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  } else {
    redirect("/settings");
  }

  return null;
}
