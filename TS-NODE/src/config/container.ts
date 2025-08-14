import { Container } from "inversify";
import { TasksController } from "../tasks/task.controller";
import { TasksRouter } from "../tasks/tasks.router";
import { UserController } from "../user/user.controller";
import { TaskService } from "../tasks/tasks.service";
import { updateTaskProvider } from "../tasks/providers/updateTask.provider";
import { getTaskProvider } from "../tasks/providers/getTask.provider";

export const container: Container = new Container();
container.bind(TasksController).toSelf().inTransientScope();
container.bind(TasksRouter).toSelf().inTransientScope();
container.bind(UserController).toSelf().inTransientScope();
container.bind(TaskService).toSelf().inTransientScope();
container.bind(updateTaskProvider).toSelf().inTransientScope();
container.bind(getTaskProvider).toSelf().inTransientScope();
