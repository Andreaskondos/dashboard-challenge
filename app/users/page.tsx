import UsersTable from "@/components/UsersTable";
import { db } from "@/app/firebase/config";
import { getUsers } from "@/lib/actions";

export default async function Users() {
  const users = await getUsers(db);

  return <UsersTable users={users} />;
}
