import { Metadata } from "next";
import SignInClient from "./signInClient";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Login to the site",
};

export default function SignIn() {
  return <SignInClient />;
}
