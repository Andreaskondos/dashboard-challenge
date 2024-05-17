import TableCol from "./TableCol";
import { ImCog } from "react-icons/im";
import { IoTrashBinSharp } from "react-icons/io5";
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";
import { deleteUserByEmail } from "@/lib/actions";
import { initAdmin } from "@/app/firebase/firebaseAdmin";
import admin from "firebase-admin";

export interface User {
  id: string;
  name: string;
  photo: string;
  phone: string;
  email: string;
}

export default async function TableRow({ user }: { user: User }) {
  const { id, email } = user;

  async function deleteTargetUser() {
    "use server";
    await initAdmin();
    const user = await admin.auth().getUser(id);
    if (!user) {
      return null;
    }

    await admin.auth().deleteUser(id);
    await deleteUserByEmail(email);
  }

  return (
    <div className="px-8 flex justify-evenly">
      <TableCol text={user.name} />
      <TableCol text={user.phone} />
      <TableCol text={user.email} />
      <TableCol>
        <img
          className="w-16 rounded-full"
          src={`/users/${user.photo}`}
          alt={`${user.name} profile image`}
        />
      </TableCol>
      <TableCol>
        <div className="flex flex-col gap-2">
          <Link href={`/users/${user.id}`}>
            <ImCog className="hover:text-[#a47485] hover:scale-125  cursor-pointer active:translate-y-1 transition-all duration-300" />
          </Link>
          <DeleteButton handleClick={deleteTargetUser} />
        </div>
      </TableCol>
    </div>
  );
}
