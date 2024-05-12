"use client";

import { useCurrentUser } from "@/context/CurrentUserContext";
import { redirect } from "next/navigation";

export default function Home() {
  const { currentUser }: any = useCurrentUser();

  if (currentUser) {
    redirect("/settings");
  } else {
    redirect("/login");
  }

  return null;
}
