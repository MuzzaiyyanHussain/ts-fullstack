import { Application } from "express";
import { container } from "./container";
import { TasksRouter } from "../tasks/tasks.router";
export function addRoutes(app: Application): Application {
  const taskRouter = container.get<TasksRouter>(TasksRouter);
  app.use("/tasks", taskRouter.router);
  return app;
}
