import { z } from "zod";
export const createTaskSchema = z.object({
  title: z.string().max(100, { message: "Title should not exceeds 100 chars" }),
  dueDate: z.date({ required_error: "Due date is mandatory" }),
  description: z.string().max(500, {
    message: "Description should not exeeds 500 chars",
  }),
  status: z.enum(["todo", "inProgress", "completed"], {
    message: "Status is required",
  }),
  priority: z.enum(["low", "normal", "high"], {
    message: "Priority is required",
  }),
});
