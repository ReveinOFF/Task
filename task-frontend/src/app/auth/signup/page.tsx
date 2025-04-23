import { Metadata } from "next";
import SignUpClient from "./signUpClient";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Register on the website",
};

export default function SignUp() {
  return <SignUpClient />;
}
