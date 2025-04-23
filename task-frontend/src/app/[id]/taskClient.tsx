"use client";

import styles from "../page.module.css";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/services/axiosAuth";
import Link from "next/link";
import { useEffect } from "react";

const schema = z.object({
  name: z
    .string()
    .min(5, "The name must be at least 5 characters long")
    .max(25, "The maximum number of characters should be no more than 25"),
  description: z
    .string()
    .min(6, "The description must contain at least 25 characters"),
  status: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function TaskCLient({ id }: { id: number | string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData2"],
    queryFn: async () => (await axios.get(`/task/${id}`)).data,
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("description", data.description);
      setValue("status", data.status);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      status: string;
    }) => {
      const response = await axios.put(`/task/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      alert("Task updated");
    },
    onError: (error: any) => {
      console.log(error);
      alert(error.message);
    },
  });

  const onSubmit = async (data: FormData) => {
    await mutation.mutateAsync(data);
  };

  return (
    <div className={styles.container}>
      <h1>Update task</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <fieldset className="fieldset">
          <label htmlFor="name">Name</label>
          <input id="name" type="name" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </fieldset>
        <fieldset className="fieldset">
          <label htmlFor="description">Description</label>
          <textarea id="description" {...register("description")}></textarea>
          {errors.description && <p>{errors.description.message}</p>}
        </fieldset>
        <fieldset className="fieldset">
          <label htmlFor="status">Status</label>
          <select {...register("status")}>
            <option value="todo">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </fieldset>
        <button type="submit">Update</button>
      </form>
      <Link href="/" className="link">
        Cancel
      </Link>
    </div>
  );
}
