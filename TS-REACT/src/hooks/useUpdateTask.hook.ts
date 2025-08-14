import type { IResponse } from "@/types/response.interface";
import type { ITask } from "@/types/task.interface";
import type { IUpdateTask } from "@/types/updateTask.interface";
import { useMutation } from "@tanstack/react-query";
const API_URL = import.meta.env.VITE_API_URL;

const updateTask = async (task: IUpdateTask) => {
  const response = await fetch(`${API_URL}/tasks/update`, {
    method: "PATCH",
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

export function useUpdateTask() {
  return useMutation({
    mutationFn: updateTask,
    onSuccess: (response: IResponse<ITask>) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
