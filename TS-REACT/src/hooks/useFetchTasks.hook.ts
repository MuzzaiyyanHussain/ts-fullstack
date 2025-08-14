import type { IResponse } from "@/types/response.interface";
import type { ITask } from "@/types/task.interface";
import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const fetchTasks = async (): Promise<IResponse<ITask[]>> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Response not OK");
  }
  return await response.json();
};

export function useFetchTasks() {
  return useQuery({
    queryKey: ["fetchTasks"],
    queryFn: fetchTasks,
  });
}
