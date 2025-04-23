"use client";

import Link from "next/link";
import styles from "../page.module.css";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "@/services/axiosAuth";

const schema = z.object({
  name: z
    .string()
    .min(5, "The name must be at least 5 characters long")
    .max(25, "The maximum number of characters should be no more than 25"),
  description: z
    .string()
    .min(6, "The description must contain at least 25 characters"),
});

type FormData = z.infer<typeof schema>;

export default function AddCLient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: { name: string; description: string }) => {
      const response = await axios.post("/task", data);
      return response.data;
    },
    onSuccess: () => {
      alert("Task created");
      setValue("name", "");
      setValue("description", "");
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
      <h1>Add task</h1>

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
        <button type="submit">Add</button>
      </form>
      <Link href="/" className="link">
        Cancel
      </Link>
    </div>
  );
}
