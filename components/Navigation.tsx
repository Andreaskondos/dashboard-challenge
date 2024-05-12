"use client";

import NavItem from "./NavItem";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { redirect } from "next/navigation";
import { setCookie } from "@/lib/actions";
import { useCurrentUser } from "@/context/CurrentUserContext";

export default function Navigation() {
  const { role, currentUser }: any = useCurrentUser();

  return (
    <div className=" flex justify-items-start h-screen flex-col items-center row-span-full col-start-1 bg-[#E7D4B7] w-[20vw]  ">
      <img
        className="w-[20vw] border-b-[1px] border-[#a47485]"
        src="/logo.png"
        alt="GoodieBox Logo"
      />
      <ul className="mt-8 flex flex-col items-center justify-starth-full w-[20vw] gap-4">
        {currentUser && (
          <>
            {role === "admin" && (
              <>
                <NavItem icon="users" href="/users">
                  Users
                </NavItem>
                <NavItem icon="create" href="/createUser">
                  Create User
                </NavItem>
              </>
            )}
            <NavItem icon="settings" href="/settings">
              Settings
            </NavItem>
          </>
        )}
        {!currentUser && (
          <>
            <NavItem icon="singup" href="/signup">
              Sign up
            </NavItem>
            <NavItem icon="login" href="/login">
              Login
            </NavItem>
          </>
        )}
        {currentUser && (
          <NavItem
            onClick={() => {
              signOut(auth);
              setCookie("user", "");
              redirect("/login");
            }}
            icon="logout"
          >
            Logout
          </NavItem>
        )}
      </ul>
    </div>
  );
}
