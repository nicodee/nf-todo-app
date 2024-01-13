import { memo } from "react";
import { TaskList } from "../Components/TaskList";
import { useStore } from "../store";

export const ActiveTasks = memo(function ActiveTasks() {
  const tasks = useStore(state => state.tasks.filter(task => !task.completed));

  return <TaskList tasks={tasks} />;
});
