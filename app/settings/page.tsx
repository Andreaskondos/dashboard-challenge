"use client";

import SettingsForm from "@/components/SettingsForm";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { redirect } from "next/navigation";

export default function Settings() {
  const { currentUser }: any = useCurrentUser();
  if (!currentUser) redirect("/");

  return <SettingsForm user={currentUser} />;
}
