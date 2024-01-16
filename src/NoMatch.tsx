import { Flex, Result } from "antd";
import { Link } from "react-router-dom";

export default function NoMatch() {
  return (
    <Flex id="no-match-page" justify="center" align="center" vertical>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to={`/`}>Back Home</Link>}
      />
    </Flex>
  );
}
