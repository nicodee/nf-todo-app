import { Flex, Empty } from "antd";

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

export default EmptyList;
