"use client";

import { FaUserGroup, FaUserGear } from "react-icons/fa6";
import { ImUserPlus } from "react-icons/im";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

const icons = {
  users: <FaUserGroup />,
  create: <ImUserPlus />,
  settings: <FaUserGear />,
  singup: <HiMiniPencilSquare />,
  login: <FiLogIn />,
  logout: <FiLogOut />,
};

export default function NavItem({
  children,
  icon,
  href = "#",
  onClick,
}: {
  children?: React.ReactNode;
  icon: keyof typeof icons;
  href?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="w-[70%] text-left">
      <Link
        onClick={onClick}
        href={href}
        className={`w-full h-full text-4xl flex items-center justify-evenly py-4 px-8 gap-8 hover:bg-[#ecddc5] rounded-md cursor-pointer hover:shadow-md transition-all duration-300 active:translate-y-1 active:shadow-none
        ${isActive ? "bg-[#ecddc5] shadow-sm text-[#d63637]" : ""}`}
      >
        <span>{icons[icon]}</span>
        <p className=" w-full">{children}</p>
      </Link>
    </li>
  );
}
