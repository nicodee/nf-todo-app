import { memo } from "react";
import { useStore } from "../store";
import { Button, Flex } from "antd";

export const ClearTasksButton = memo(function ClearTasksButton() {
  const { completedTasks, clearCompletedTasks } = useStore(state => ({
    clearCompletedTasks: state.clearCompletedTasks,
    completedTasks: state.tasks.filter(task => task.completed),
  }));

  const tasksLength = completedTasks.length;
  if (tasksLength === 0) return null;
  return (
    <Flex justify="center" align="center">
      <Button onClick={clearCompletedTasks} type="link">
        Clear {tasksLength} Completed {tasksLength === 1 ? "Task" : "Tasks"}
      </Button>
    </Flex>
  );
});
