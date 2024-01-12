import { Link } from "react-router-dom";

export default function NoMatch() {
  return (
    <div id="no-match-page">
      <h1>404: Page Not Found</h1>
      <p>
        <Link to={`/`}>Go to home page</Link>
      </p>
    </div>
  );
}
