import { memo } from "react";
import { Link } from "react-router-dom";

export const Nav = memo(function Nav() {
    return (
        <div>
            <nav>
            <ul>
                <li>
                    <Link to={`/`}>All Tasks</Link>
                </li>
                <li>
                    <Link to={`/incomplete`}>Incomplete</Link>
                </li>
                <li>
                    <Link to={`/complete`}>Complete</Link>
                </li>
            </ul>
            </nav>
        </div>
    )
})