import { memo } from "react";
import { Tasks } from "../types";
import { TaskItemContainer } from "./TaskItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { StyledScrollableDiv } from "../styles";
import { Empty, Flex } from "antd";

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
  const [parent] = useAutoAnimate();

  return (
    <>
      <StyledScrollableDiv ref={parent}>
        {tasks.length === 0 && <EmptyList />}
        {tasks.map(task => {
          return <TaskItemContainer task={task} key={task.id} />;
        })}
      </StyledScrollableDiv>
    </>
  );
});
