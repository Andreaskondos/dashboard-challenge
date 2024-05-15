"use client";

import Form from "./Form";
import FormInput from "./FormInput";

export default function SettingsForm({ currentUser }: { currentUser: any }) {
  return (
    <Form scroll={true}>
      <FormInput label="name" type="text" defaultValue={currentUser.name}>
        Name:
      </FormInput>
      <FormInput label="phone" type="tel" defaultValue={currentUser.phone}>
        Telephone:
      </FormInput>
      <FormInput label="email" type="email" defaultValue={currentUser.email}>
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
    </Form>
  );
}
