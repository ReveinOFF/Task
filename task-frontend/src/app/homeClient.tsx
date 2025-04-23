"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/services/axiosAuth";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function HomeCLient() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => (await axios.get("/task")).data,
  });

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`/task/${id}`);
      return response.data;
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(["repoData"], (oldData: any[]) => {
        return oldData.filter((task) => task.id !== id);
      });
      alert("Task deleted");
    },
    onError: (error: any) => {
      console.log(error);
      alert(error.message);
    },
  });

  const onDelete = async (id: number) => {
    await mutation.mutateAsync(id);
  };

  const groupedByStatus = useMemo(() => {
    if (!data) return {};
    return data.reduce((acc: any, task: any) => {
      const status = task.status || "unknown";
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(task);
      return acc;
    }, {});
  }, [data]);

  return (
    <div className={styles.container}>
      <h1>Tasks</h1>

      <button className={styles.btn_create} onClick={() => router.push("/add")}>
        Create
      </button>

      <div className={styles.task_block}>
        {isPending ? (
          <p className={styles.p}>Loading...</p>
        ) : data?.length > 0 ? (
          <div className={styles.task_list}>
            {Object.entries(groupedByStatus).map(([status, tasks]) => (
              <div key={status} className={styles.task_stat}>
                <h2>{status}</h2>
                {(tasks as any[]).map((task) => (
                  <div key={task.id} className={styles.task}>
                    <div className={styles.task_info}>
                      <h3>{task.name}</h3>
                      <p>{task.description}</p>
                    </div>

                    <div className={styles.task_btn}>
                      <button onClick={() => router.push(`/${task.id}`)}>
                        Update
                      </button>
                      <button onClick={() => onDelete(task.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.p}>Empty</p>
        )}
      </div>
    </div>
  );
}
