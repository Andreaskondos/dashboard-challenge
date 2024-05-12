"use client";

import SignupForm from "@/components/SignUpForm";
import { auth, db } from "@/app/firebase/config";
import { setCookie } from "@/lib/actions";
import { redirect } from "next/navigation";
import { RegisterSchema } from "@/lib/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore/lite";

export default function SignUp() {
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
        await setDoc(doc(db, "users", validatedData.data.email), {
          name: validatedData.data.name,
          phone: validatedData.data.phone,
          email: validatedData.data.email,
          photo: "default.jpg",
          role: "user",
        });

        const tokenID = await newUser?.user.getIdToken();
        setCookie("user", tokenID!);
        redirect("/settings");
      }

      if (validatedData.error) {
        validatedData.error.errors.map((error) =>
          console.log(error.path[0], ":", error.message)
        );
      }
      console.log(newUser);
    } catch (e) {
      console.log("SIGNUP___ERROR___", e);
    }
  }

  return <SignupForm onSubmit={handleSignup} />;
}
