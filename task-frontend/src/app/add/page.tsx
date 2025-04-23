import { Metadata } from "next";
import AddCLient from "./addClient";

export const metadata: Metadata = {
  title: "Add task",
  description: "You can add your task",
};

export default function Add() {
  return <AddCLient />;
}
