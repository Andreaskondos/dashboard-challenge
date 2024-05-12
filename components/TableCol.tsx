export default function TableCol({
  children,
  text,
}: {
  children?: React.ReactNode;
  text?: string;
}) {
  return (
    <div className="text-3xl border-b-[1px] border-[#a47485] w-full py-6 px-3">
      {children || text}
    </div>
  );
}
