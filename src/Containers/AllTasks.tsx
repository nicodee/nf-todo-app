import { memo } from "react";
import { TaskList } from "../Components/TaskList";

import { useStore } from "../store";

export const AllTasks = memo(function AllTasks() {
  const { tasks } = useStore();

  return <TaskList tasks={tasks} />;
});
