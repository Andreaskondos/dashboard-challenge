export default function FormButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <button
      className="bg-[#a47485] hover:bg-[#d63637] text-white rounded-md py-4 px-8 hover:shadow-md active:shadow-none active:translate-y-1 transition-all duration-300 text-4xl uppercase"
      type="submit"
    >
      {children}
    </button>
  );
}
