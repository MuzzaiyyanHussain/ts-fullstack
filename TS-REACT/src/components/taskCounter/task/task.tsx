import { useEffect, type FC, type ReactElement, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import type { ITask } from "@/types/task.interface";
import { useUpdateTask } from "@/hooks/useUpdateTask.hook";
import { useQueryClient } from "@tanstack/react-query";

export const Task: FC<ITask> = (props): ReactElement => {
  const { title, description, status, priority, dueDate, _id } = props;
  const { mutate } = useUpdateTask();
  const [progress, setProgress] = useState(false);
  const formattedDate = new Date(dueDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    if (status === "inProgress") {
      setProgress(true);
    }
  }, [status]);

  const queryClient = useQueryClient();

  function handleProgressChange(value: boolean) {
    setProgress(value);
    if (_id) {
      mutate(
        { _id: _id, status: value ? "inProgress" : "todo" },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetchTasks"] });
          },
        }
      );
    }
  }

  function handleTaskCompleted() {
    if (_id) {
      mutate(
        { _id: _id, status: "completed" },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetchTasks"] });
          },
        }
      );
    }
  }

  return (
    <Card className="mb-8 w-full">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="basis-2/3 leading-8">{title}</CardTitle>
        <div>
          <Badge className="mr-2" variant="outline">
            {formattedDate}
          </Badge>

          {priority === "normal" && (
            <Badge className="bg-sky-800" variant="outline">
              {priority}
            </Badge>
          )}
          {priority === "high" && (
            <Badge className="bg-red-800" variant="outline">
              {priority}
            </Badge>
          )}
          {priority === "low" && (
            <Badge className="bg-green-800" variant="outline">
              {priority}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <Switch
            id="in-progress"
            onCheckedChange={handleProgressChange}
            checked={progress}
          />
          <Label className="ml-4" htmlFor="in-progress">
            {status}
          </Label>
        </div>
        <Button onClick={handleTaskCompleted}>Completed</Button>
      </CardFooter>
    </Card>
  );
};
