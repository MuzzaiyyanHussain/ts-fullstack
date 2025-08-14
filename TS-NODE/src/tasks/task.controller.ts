import { injectable, inject } from "inversify";
import { UserController } from "../user/user.controller";
import { IPartialTaskWithId, ITask } from "./task.interface";
import { Document } from "mongoose";
import { Request, Response } from "express";
import { TaskService } from "./tasks.service";
import { updateTaskProvider } from "./providers/updateTask.provider";
import { matchedData } from "express-validator";
import { ITaskPagination } from "./interface/taskPagination.interface";
import { getTaskProvider } from "./providers/getTask.provider";

@injectable()
export class TasksController {
  constructor(
    @inject(UserController) private userController: UserController,
    @inject(TaskService) private taskService: TaskService,
    @inject(updateTaskProvider) private updateTaskProvider: updateTaskProvider,
    @inject(getTaskProvider) private getTaskProvider: getTaskProvider
  ) {}

  public async handleGetTask(req: Request, res: Response) {
    const validatedData: Partial<ITaskPagination> = matchedData(req);
    try {
      const tasks: { data: ITask[]; meta: {} } =
        await this.getTaskProvider.findAllTasks(validatedData);
      return tasks;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async handlePostTask(req: Request<{}, {}, ITask>, res: Response) {
    const validatedData: ITask = matchedData(req);
    try {
      const task: Document<unknown, any, ITask> =
        await this.taskService.createTask(validatedData);
      return task;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async handlePatchTasks(
    req: Request<{}, {}, IPartialTaskWithId>,
    res: Response
  ): Promise<Document | null> {
    const validatedData: IPartialTaskWithId = matchedData(req);
    try {
      return await this.updateTaskProvider.updateTask(validatedData);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
