import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Loading from "./loading";

import { CurrentUserProvider } from "@/context/CurrentUserContext";
import { getCurrentUser } from "@/lib/actions";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "GoodieBox | Dashboard",
  description: "A Dashboard created for Goodiebox Co.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${roboto.className} grid grid-cols-[20vw_80vw] grid-rows-[10vh_90vh] overflow-hidden`}
      >
        <Toaster position="top-center" />
        <CurrentUserProvider currentUser={currentUser}>
          <Header />
          <Navigation />
          <main className="h-[90vh] w-[80vw] bg-[#ecddc5] overflow-y-auto">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
        </CurrentUserProvider>
      </body>
    </html>
  );
}
