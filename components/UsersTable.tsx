"use client";

import { redirect } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import TableCol from "./TableCol";
import TableRow from "./TableRow";
import { auth } from "@/app/firebase/config";

export default function UsersTable({ users }: { users: object[] }) {
  const [user] = useAuthState(auth);

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex justify-evenly font-bold uppercase text-[#a47485]">
        <TableCol text="Name" />
        <TableCol text="Phone" />
        <TableCol text="Email" />
        <TableCol text="Image" />
        <TableCol text="Actions" />
      </div>
      {users.map((user: any) => (
        <TableRow key={user.name} user={user} />
      ))}
    </>
  );
}
