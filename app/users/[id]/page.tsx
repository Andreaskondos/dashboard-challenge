import { initAdmin } from "@/app/firebase/firebaseAdmin";
import SettingsForm from "@/components/SettingsForm";
import {  getUserByEmail } from "@/lib/actions";
import admin from "firebase-admin";

export default async function User({ params }: { params: { id: string } }) {
  const { id } = params;
  await initAdmin();
  const { email }: any = await admin.auth().getUser(id);
  const user = await getUserByEmail(email);

  if (!user) {
    return <h1>User not found</h1>;
  }

  return <SettingsForm user={user} />;
}
