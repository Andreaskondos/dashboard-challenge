"use client";

import SettingsForm from "@/components/SettingsForm";
import { useCurrentUser } from "@/context/CurrentUserContext";

export default function Settings() {
  const { currentUser }: any = useCurrentUser();

  return <SettingsForm currentUser={currentUser} />;
}
