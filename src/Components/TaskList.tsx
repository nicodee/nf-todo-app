import { memo } from "react";
import { Tasks } from "../types";
import { TaskItemContainer } from "./TaskItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { StyledScrollableDiv } from "../styles";
import { Empty, Flex } from "antd";

const EmptyList = () => (
  <Flex
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
  const _tasks = Object.entries(tasks);
  const [parent] = useAutoAnimate();

  return (
    <>
      <StyledScrollableDiv ref={parent}>
        {_tasks.length === 0 && <EmptyList />}
        {_tasks.map(([taskId, task]) => {
          return <TaskItemContainer task={task} key={taskId} />;
        })}
      </StyledScrollableDiv>
    </>
  );
});
