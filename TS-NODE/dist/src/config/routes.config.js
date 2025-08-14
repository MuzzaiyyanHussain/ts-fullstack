"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoutes = addRoutes;
const container_1 = require("./container");
const tasks_router_1 = require("../tasks/tasks.router");
function addRoutes(app) {
    const taskRouter = container_1.container.get(tasks_router_1.TasksRouter);
    app.use("/tasks", taskRouter.router);
    return app;
}
