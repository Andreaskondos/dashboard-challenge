import CreateUserForm from "@/components/CreateUserForm";
import { getCurrentUserOrRedirect } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function CreateUser() {
  const currentUser = await getCurrentUserOrRedirect();

  if (!currentUser || currentUser?.role !== "admin") {
    redirect("/");
  }

  return <CreateUserForm />;
}
