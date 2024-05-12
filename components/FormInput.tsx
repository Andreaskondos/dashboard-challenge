export default function FormInput({
  children,
  label,
  type,
  placeholder,
  defaultValue,
}: {
  children?: React.ReactNode;
  label: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div className="flex gap-2 items-center justify-center text-3xl bg-[#ecddc5] rounded-md w-[60%] px-8 py-4 ">
      <label className="text-3xl w-[30%] text-[#a47485]" htmlFor={label}>
        {children}
      </label>
      <input
        className="w-[70%] bg-[#ecddc5] rounded-md text-[#d63637]"
        type={type}
        id={label}
        name={label}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
}
