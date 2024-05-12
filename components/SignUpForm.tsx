"use client";

import Form from "@/components/Form";
import FormButton from "@/components/FormButon";
import FormInput from "@/components/FormInput";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/context/CurrentUserContext";

export default function SignupForm({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const { currentUser }: any = useCurrentUser();

  if (currentUser) {
    redirect("/settings");
  }

  return (
    <Form scroll={true} onSubmit={onSubmit}>
      <FormInput label="name" type="text" placeholder="Andreas Kontos">
        Name:
      </FormInput>
      <FormInput label="phone" type="tel" placeholder="+4512345678">
        Telephone:
      </FormInput>
      <FormInput label="email" type="email" placeholder="example@mail.com">
        Email:
      </FormInput>
      <FormInput label="password" type="password" placeholder="********">
        Password:
      </FormInput>
      <FormInput label="confirmPassword" type="password" placeholder="********">
        Confirm Password:
      </FormInput>
      <FormButton>Sign Up</FormButton>
    </Form>
  );
}
