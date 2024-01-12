import { memo } from "react";
import { Tasks } from "../types";
import { TaskItemContainer } from "./TaskItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { StyledListWrapper, StyledScrollableDiv } from "../styles";
import { Flex } from "antd";

const EmptyList = () => (
  <Flex justify="center" align="center">
    <p>No tasks to display</p>
  </Flex>
);

export const TaskList = memo(function TaskList({ tasks }: { tasks: Tasks }) {
  const _tasks = Object.entries(tasks);
  const [parent] = useAutoAnimate();

  if (_tasks.length === 0) return <EmptyList />;

  return (
    <>
      {_tasks.length > 0 && (
        <StyledListWrapper>
          <StyledScrollableDiv ref={parent}>
            {_tasks.map(([taskId, task]) => {
              return <TaskItemContainer task={task} key={taskId} />;
            })}
          </StyledScrollableDiv>
        </StyledListWrapper>
      )}
    </>
  );
});
