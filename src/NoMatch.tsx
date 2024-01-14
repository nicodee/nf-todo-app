import { Flex } from "antd";
import { Link } from "react-router-dom";

export default function NoMatch() {
  return (
    <Flex id="no-match-page" justify="center" align="center" vertical>
      <h1>404: Page Not Found</h1>
      <p>
        <Link to={`/`}>Go back</Link>
      </p>
    </Flex>
  );
}
