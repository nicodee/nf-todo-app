import { memo, useCallback } from "react";
import { useStore } from "../store";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import EmptyList from "../Components/EmptyList";
import { TaskItemContainer } from "../Components/TaskItem";
import { StyledScrollableDiv } from "../styles";
import { TaskType } from "../types";

export const ActiveTasks = memo(function ActiveTasks() {
  const { tasks, activeTasks, moveTask } = useStore(state => ({
    tasks: state.tasks,
    activeTasks: state.tasks.filter(task => !task.completed),
    moveTask: state.moveTask,
  }));
  const [parent] = useAutoAnimate();

  const renderTaskItem = useCallback(
    (task: TaskType, index: number) => {
      return (
        <TaskItemContainer
          key={task.id}
          id={task.id}
          task={task}
          index={index}
          moveTask={moveTask}
        />
      );
    },
    [moveTask],
  );

  return (
    <>
      <StyledScrollableDiv ref={parent}>
        {activeTasks.length === 0 && <EmptyList />}
        {tasks.map((task, index) => {
          if (task.completed) {
            return null;
          }
          return renderTaskItem(task, index);
        })}
      </StyledScrollableDiv>
    </>
  );
});
