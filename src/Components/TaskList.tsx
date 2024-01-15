import { memo, useCallback, useState } from "react";
import { TaskType, Tasks } from "../types";
import { TaskItemContainer } from "./TaskItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { StyledScrollableDiv } from "../styles";
import { Empty, Flex } from "antd";
import { useStore } from "../store";
import update from "immutability-helper";

const EmptyList = () => (
  <Flex
    data-testid="empty-list-icon"
    justify="center"
    align="center"
    gap={20}
    vertical
    style={{
      margin: "20px auto",
    }}
  >
    <Empty description="" />
  </Flex>
);

export const TaskList = memo(function TaskList({ tasks }: { tasks: Tasks }) {
  const { sortTasks } = useStore();
  const [_tasks, setTasks] = useState(tasks);
  const [parent] = useAutoAnimate();

  const moveTaskHandler = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setTasks((prevTasks: Tasks) =>
        update(prevTasks, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevTasks[dragIndex] as TaskType],
          ],
        }),
      );
      sortTasks(_tasks);
    },
    [_tasks, sortTasks],
  );

  const renderTaskItem = useCallback(
    (task: TaskType, index: number) => {
      return (
        <TaskItemContainer
          key={task.id}
          id={task.id}
          task={task}
          index={index}
          moveTask={moveTaskHandler}
        />
      );
    },
    [moveTaskHandler],
  );

  return (
    <>
      <StyledScrollableDiv ref={parent}>
        {_tasks.length === 0 && <EmptyList />}
        {_tasks.map((task, index) => {
          return renderTaskItem(task, index);
        })}
      </StyledScrollableDiv>
    </>
  );
});
