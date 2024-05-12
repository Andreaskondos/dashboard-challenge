"use client";

import { createContext, useContext } from "react";

const CurrentUserContext = createContext<object | null>(null);

function CurrentUserProvider({
  children,
  currentUser,
}: Readonly<{
  children: React.ReactNode;
  currentUser: any;
}>) {
  const role: string | undefined = currentUser?.role;

  return (
    <CurrentUserContext.Provider value={{ currentUser, role }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

function useCurrentUser() {
  const context = useContext(CurrentUserContext);
  if (!context) return;
  return context;
}

export { CurrentUserProvider, useCurrentUser };
