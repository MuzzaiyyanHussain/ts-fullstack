import type { IResponse } from "@/types/response.interface";
import type { ITask } from "@/types/task.interface";
import { useMutation } from "@tanstack/react-query";
const API_URL = import.meta.env.VITE_API_URL;

const createTask = async (task: ITask) => {
  const response = await fetch(`${API_URL}/tasks/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Response not OK");
  }
  return await response.json();
};

export function useCreateTask() {
  return useMutation({
    mutationFn: createTask,
    onSuccess: (response: IResponse<ITask>) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
