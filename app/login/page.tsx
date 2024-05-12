"use client";

import Form from "@/components/Form";
import FormButton from "@/components/FormButon";
import FormInput from "@/components/FormInput";
import { LoginSchema } from "@/lib/zod";
import { auth } from "@/app/firebase/config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { redirect } from "next/navigation";
import { setCookie } from "@/lib/actions";
import { useCurrentUser } from "@/context/CurrentUserContext";

export default function Login() {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const { currentUser }: any = useCurrentUser();

  if (currentUser) {
    redirect("/settings");
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const email = data.get("email");
      const password = data.get("password");
      const validatedData = LoginSchema.safeParse({ email, password });

      if (validatedData.success) {
        const res = await signInWithEmailAndPassword(
          validatedData.data.email,
          validatedData.data.password
        );
        const tokenID = await res?.user.getIdToken();
        setCookie("user", tokenID!);
        redirect("/settings");
      }
      if (validatedData.error) {
        validatedData.error.errors.map((error) =>
          console.log(error.path[0], ":", error.message)
        );
      }
    } catch (e) {
      console.log("LOGIN___ERROR___", e);
    }
  }

  return (
    <Form onSubmit={handleLogin}>
      <FormInput label="email" type="email" placeholder="example@mail.com">
        Email:
      </FormInput>
      <FormInput label="password" type="password" placeholder="********">
        Password:
      </FormInput>
      <FormButton>Login</FormButton>
    </Form>
  );
}
