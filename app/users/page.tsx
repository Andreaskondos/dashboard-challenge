import UsersTable from "@/components/UsersTable";
import { db } from "@/app/firebase/config";
import { getCurrentUser, getUsers } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Users() {
  const users = await getUsers(db);

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  const { role }: any = currentUser;
  if (role !== "admin") {
    redirect("/");
  }

  return <UsersTable users={users} />;
}
