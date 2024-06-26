"use client";

import Form from "@/components/Form";
import FormButton from "@/components/FormButon";
import FormInput from "@/components/FormInput";
import { RegisterSchema } from "@/lib/zod";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { setDoc, doc } from "firebase/firestore/lite";
import { redirect } from "next/navigation";
import { setCookie } from "@/lib/actions";
import toast from "react-hot-toast";
import { useRef } from "react";

export default function CreateUserForm({ login = true }: { login?: boolean }) {
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const ref = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const name = data.get("name");
      const phone = data.get("phone");
      const role = data.get("role");
      const email = data.get("email");
      const password = data.get("password");
      const confirmPassword = data.get("confirmPassword");
      const validatedData = RegisterSchema.safeParse({
        name,
        phone,
        email,
        role,
        password,
        confirmPassword,
      });
      let newUser;
      if (validatedData.success) {
        newUser = await createUserWithEmailAndPassword(
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
          role: validatedData.data.role,
        });

        ref.current?.reset();
        if (newUser) toast.success("New user successfully created!");
        if (login) {
          const tokenID = await newUser?.user.getIdToken();
          setCookie("user", tokenID!);
          redirect("/settings");
        }
      }

      if (validatedData.error) {
        validatedData.error.errors.map((error) => {
          toast.error(`${error.path[0]} : ${error.message}`);
          console.log(error.path[0], ":", error.message);
        });
      }
    } catch (e) {
      console.log("SIGNUP___ERROR___", e);
    }
  }
  return (
    <Form scroll={true} onSubmit={handleSubmit} ref={ref}>
      <FormInput label="name" type="text" placeholder="Andreas Kontos">
        Name:
      </FormInput>
      <FormInput label="phone" type="tel" placeholder="+4512345678">
        Telephone:
      </FormInput>
      <FormInput label="email" type="email" placeholder="example@mail.com">
        Email:
      </FormInput>
      <FormInput label="role" type="text" placeholder="user || admin">
        Role:
      </FormInput>
      <FormInput label="password" type="password" placeholder="********">
        Password:
      </FormInput>
      <FormInput label="confirmPassword" type="password" placeholder="********">
        Confirm Password:
      </FormInput>
      <FormButton>Create User</FormButton>
    </Form>
  );
}
