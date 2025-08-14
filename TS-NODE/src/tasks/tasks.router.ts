import { Request, Response, Router } from "express";
import { TasksController } from "./task.controller";
import { createTaskValidator } from "./validators/createTask.validator";
import { injectable, inject } from "inversify";
import { IPartialTaskWithId, ITask } from "./task.interface";
import { validationResult } from "express-validator";
import { getTasksValidator } from "./validators/getTasks.validator";
import { StatusCodes } from "http-status-codes";
import { updateTaskValidator } from "./validators/updateTask.validator";
export const tasksRouter: Router = Router();

@injectable()
export class TasksRouter {
  public router: Router;
  constructor(
    @inject(TasksController) private taskController: TasksController
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/",
      getTasksValidator,
      async (req: Request, res: Response) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
          const allTasks = await this.taskController.handleGetTask(req, res);
          res.status(StatusCodes.OK).json(allTasks);
        } else {
          res.status(StatusCodes.BAD_REQUEST).json(result.array());
        }
      }
    );

    this.router.post(
      "/create",
      createTaskValidator,
      async (req: Request<{}, {}, ITask>, res: Response) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
          const newTask = await this.taskController.handlePostTask(req, res);
          res.locals.meta = { count: 1 };
          res.status(StatusCodes.CREATED).json(newTask);
        } else {
          res.status(StatusCodes.BAD_REQUEST).json(result.array());
        }
      }
    );

    this.router.patch(
      "/update",
      updateTaskValidator,
      async (req: Request<{}, {}, IPartialTaskWithId>, res: Response) => {
        const result = validationResult(updateTaskValidator);
        if (result.isEmpty()) {
          const updatedTask = await this.taskController.handlePatchTasks(
            req,
            res
          );
          res.status(StatusCodes.OK).json(updatedTask);
        } else {
          res.status(StatusCodes.BAD_REQUEST).json(result.array());
        }
      }
    );
  }
}
