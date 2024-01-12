import { memo } from "react";
import { TaskList } from "../Components/TaskList";
import { useStore } from "../store";

export const CompletedTasks = memo(function CompletedTasks() {
  const tasks = useStore(state =>
    Object.fromEntries(
      Object.entries(state.tasks).filter(([, task]) => task.completed),
    ),
  );

  return <TaskList tasks={tasks} />;
});
