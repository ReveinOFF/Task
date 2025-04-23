import { Metadata } from "next";
import HomeCLient from "./homeClient";

export const metadata: Metadata = {
  title: "Tasks",
  description: "Look at your task list",
};

export default function Home() {
  return <HomeCLient />;
}
