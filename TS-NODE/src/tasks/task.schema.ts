import { Schema, Model, model } from "mongoose";
import { ITask } from "./task.interface";
const TaskSchema: Schema<ITask> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      maxLength: [100, "Title cannot be more than 100 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
      trim: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["todo", "inProgress", "completed"],
      default: "todo",
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "normal", "high"],
      default: "normal",
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Task: Model<ITask> = model("Task", TaskSchema);
