import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';

export const Nav = memo(function Nav() {
  const { allTasks, activeTasks, completeTasks } = useStore(state => ({
    allTasks: Object.entries(state.tasks).length,
    activeTasks: Object.entries(state.tasks).filter(([, task]) => !task.completed).length,
    completeTasks: Object.entries(state.tasks).filter(([, task]) => task.completed).length,
  }));
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={`/`}>All Tasks: {allTasks}</Link>
          </li>
          <li>
            <Link to={`/active`}>Incomplete: {activeTasks}</Link>
          </li>
          <li>
            <Link to={`/complete`}>Complete: {completeTasks}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
});
