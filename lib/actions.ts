"use server";

import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore/lite";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { db } from "@/app/firebase/config";

export interface UserType {
  name: string;
  phone: string;
  email: string;
  photo?: string;
  role?: string;
}

export async function getUsers(db: any) {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map((doc) => doc.data());

  return usersList;
}

export async function createUser(db: any, user: any) {
  try {
    console.log("Creating user", user);
    await setDoc(doc(db, "users", user.email), user);
  } catch (e) {
    console.log(e);
  }
}

export async function setCookie(key: string, value: string) {
  if (value === "") {
    cookies().delete(key);
  } else {
    cookies().set(key, value, { path: "/" });
  }
}

export async function getCurrentUserOrRedirect() {
  const cookieStore = cookies();
  const token = cookieStore.get("user");
  if (!token || token?.value == "") {
    redirect("/");
  }
  const decodedToken = jwtDecode(token?.value!);
  if (!decodedToken) {
    redirect("/");
  }
  const { email }: any = decodedToken;

  const docRef = doc(db, "users", email!);
  const docSnapshot = await getDoc(docRef);
  const currentUser = docSnapshot.data();
  return currentUser;
}

export async function getCurrentUserRole() {
  const cookieStore = cookies();
  const token = cookieStore.get("user");
  if (!token || token?.value == "") {
    return "user";
  }
  const decodedToken = jwtDecode(token?.value!);
  if (!decodedToken) {
    return "user";
  }

  const { email }: any = decodedToken;

  const docRef = doc(db, "users", email!);
  const docSnapshot = await getDoc(docRef);
  const currentUser = docSnapshot.data();
  return currentUser?.role || "user";
}

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("user");

  if (!token || token?.value == "") {
    return null;
  }
  const decodedToken = jwtDecode(token?.value!);
  if (!decodedToken) {
    return null;
  }

  const { email }: any = decodedToken;

  const docRef = doc(db, "users", email!);
  const docSnapshot = await getDoc(docRef);
  const currentUser = docSnapshot.data();
  return currentUser;
}
