import { Outlet } from "react-router-dom";
import { StyledList, StyledTitle } from "../styles";
import { Layout, Typography } from "antd";
import { Header } from "../Components/Header";
import { ClearTasksButton } from "../Components/ClearTasksButton";

export default function LayoutWrapper() {
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
          <Outlet />
        </StyledList>
      </Layout.Content>
    </Layout>
  );
}
