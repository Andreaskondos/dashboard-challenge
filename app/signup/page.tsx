"use client";

import SignupForm from "@/components/SignUpForm";
import { auth, db } from "@/app/firebase/config";
import { setCookie } from "@/lib/actions";
import { redirect } from "next/navigation";
import { RegisterSchema } from "@/lib/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore/lite";
import { useCurrentUser } from "@/context/CurrentUserContext";
import toast from "react-hot-toast";

export default function SignUp() {
  const { currentUser }: any = useCurrentUser();

  if (currentUser) {
    redirect("/settings");
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const name = data.get("name");
      const phone = data.get("phone");
      const email = data.get("email");
      const password = data.get("password");
      const confirmPassword = data.get("confirmPassword");
      const validatedData = RegisterSchema.safeParse({
        name,
        phone,
        email,
        password,
        confirmPassword,
      });
      let newUser;
      if (validatedData.success) {
        newUser = await createUserWithEmailAndPassword(
          auth,
          validatedData.data.email,
          validatedData.data.password
        );
        if (!newUser) toast.error("User already exists");

        await setDoc(doc(db, "users", validatedData.data.email), {
          id: newUser?.user.uid,
          name: validatedData.data.name,
          phone: validatedData.data.phone,
          email: validatedData.data.email,
          photo: "default.jpg",
          role: "user",
        });

        if (newUser) toast.success("Your account successfully created!");
        const tokenID = await newUser?.user.getIdToken();
        setCookie("user", tokenID!);
        redirect("/settings");
      }

      if (validatedData.error) {
        validatedData.error.errors.map((error) =>
         { toast.error(`${error.path[0]} : ${error.message}`);
          console.log(error.path[0], ":", error.message)}
        );
      }
      console.log(newUser);
    } catch (e) {
      console.log("SIGNUP___ERROR___", e);
    }
  }

  return <SignupForm onSubmit={handleSignup} />;
}
