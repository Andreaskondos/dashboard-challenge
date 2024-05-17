"use client";

import Form from "./Form";
import FormButton from "./FormButon";
import FormInput from "./FormInput";

export default function SettingsForm({ user }: { user: any }) {
  return (
    <Form scroll={true}>
      <FormInput label="name" type="text" defaultValue={user.name}>
        Name:
      </FormInput>
      <FormInput label="phone" type="tel" defaultValue={user.phone}>
        Telephone:
      </FormInput>
      <FormInput label="email" type="email" defaultValue={user.email}>
        Email:
      </FormInput>
      <FormInput label="password" type="password" placeholder="********">
        Current Password:
      </FormInput>
      <FormInput label="newPassword" type="password" placeholder="********">
        New Password:
      </FormInput>
      <FormInput label="confirmPassword" type="password" placeholder="********">
        Confirm Password:
      </FormInput>
      <FormButton>Save Changes</FormButton>
    </Form>
  );
}
