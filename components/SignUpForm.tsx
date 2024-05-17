"use client";

import Form from "@/components/Form";
import FormButton from "@/components/FormButon";
import FormInput from "@/components/FormInput";

export default function SignupForm({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
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
