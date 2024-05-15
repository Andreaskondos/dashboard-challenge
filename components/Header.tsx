"use client";

import { useCurrentUser } from "@/context/CurrentUserContext";

export default function Header() {
  const { currentUser }: any = useCurrentUser();

  return (
    <header className="flex justify-end items-center row-start-1 row-end-2 col-start-2 bg-[#E7D4B7]  h-[10vh] w-[80vw] gap-8 px-8">
      {currentUser ? (
        <h1 className="text-4xl font-bold text-[#d63637]">
          Welcome to GoodieBox&apos;s Dashboard,{" "}
          <span className="text-[#a47485]">{currentUser.name}</span>
        </h1>
      ) : (
        <h1 className="text-4xl font-bold text-[#d63637]">
          Welcome to GoodieBox&apos;s Dashboard
        </h1>
      )}
      {currentUser && (
        <img
          className="w-16   rounded-full mr-8"
          src={`/users/${currentUser.photo}`}
          alt="GoodieBox'user profile image"
        />
      )}
    </header>
  );
}
