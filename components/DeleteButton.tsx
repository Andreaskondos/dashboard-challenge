"use client";

import { IoTrashBinSharp } from "react-icons/io5";

export function DeleteButton({ handleClick }: { handleClick: () => void }) {
  return (
    <button onClick={handleClick}>
      <IoTrashBinSharp className="hover:text-[#a47485] hover:scale-125 cursor-pointer active:translate-y-1 transition-all duration-300" />
    </button>
  );
}
