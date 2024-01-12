import { Outlet } from "react-router-dom";
import { StyledList, StyledTitle } from "../styles";
import { Layout, Typography } from "antd";
import { Header } from "../Components/Header";
import { ClearTasksButton } from "../Components/ClearTasksButton";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
          <span ref={parent}>
            <Outlet />
          </span>
        </StyledList>
      </Layout.Content>
    </Layout>
  );
}
