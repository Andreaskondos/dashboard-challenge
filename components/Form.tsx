export default function Form({
  children,
  scroll = false,
  onSubmit,
  ref,
}: {
  children?: React.ReactNode;
  scroll?: boolean;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  ref?: React.RefObject<HTMLFormElement>;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={`mx-auto my-16 flex flex-col  items-center rounded-3xl gap-16 w-[90%] h-[80%] p-16 bg-[#E7D4B7] shadow-md  ${
        scroll ? "overflow-y-auto" : "justify-center "
      }`}
    >
      {children}
    </form>
  );
}
