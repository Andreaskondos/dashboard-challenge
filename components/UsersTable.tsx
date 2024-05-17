import TableCol from "./TableCol";
import TableRow from "./TableRow";

export default function UsersTable({ users }: { users: object[] }) {
  return (
    <>
      <div className="pt-4 px-8 flex justify-evenly font-bold uppercase text-[#a47485]">
        <TableCol text="Name" />
        <TableCol text="Phone" />
        <TableCol text="Email" />
        <TableCol text="Image" />
        <TableCol text="Actions" />
      </div>
      {users.map((user: any) => (
        <TableRow key={user.id} user={user} />
      ))}
    </>
  );
}
