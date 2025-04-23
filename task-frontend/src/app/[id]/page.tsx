import { Metadata } from "next";
import TaskCLient from "./taskClient";

export const metadata: Metadata = {
  title: "Task",
  description: "Look at your task",
};

export default function Task({ params }: { params: { id: string } }) {
  return <TaskCLient id={params.id} />;
}
