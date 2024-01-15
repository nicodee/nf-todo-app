import { Outlet } from "react-router-dom";
import { StyledList, StyledTitle } from "../styles";
import { Layout, Typography } from "antd";
import { Header } from "../Components/Header";
import { ClearTasksButton } from "../Components/ClearTasksButton";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function LayoutWrapper() {
  const [parent] = useAutoAnimate();
  return (
    <Layout>
      <Layout.Content>
        <StyledTitle>
          <Typography.Title level={1}>Todo</Typography.Title>
        </StyledTitle>
        <StyledList
          bordered
          header={<Header />}
          footer={<ClearTasksButton />}
          size="large"
        >
          <DndProvider backend={HTML5Backend}>
            <span ref={parent}>
              <Outlet />
            </span>
          </DndProvider>
        </StyledList>
      </Layout.Content>
    </Layout>
  );
}
