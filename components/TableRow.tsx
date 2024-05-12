import TableCol from "./TableCol";
import { ImCog } from "react-icons/im";
import { IoTrashBinSharp } from "react-icons/io5";

export interface User {
  name: string;
  photo: string;
  phone: string;
  email: string;
}

export default function TableRow({ user }: { user: User }) {
  return (
    <div className="flex justify-evenly">
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
          <ImCog className="hover:text-[#a47485] cursor-pointer hover:shadow-md active:shadow-none active:translate-y-1 transition-all duration-300" />
          <IoTrashBinSharp className="hover:text-[#a47485] cursor-pointer hover:shadow-md active:shadow-none active:translate-y-1 transition-all duration-300" />
        </div>
      </TableCol>
    </div>
  );
}
