import { Tasks } from '../types';
import { TaskItem } from './TaskItem';

export const TaskList = ({ tasks }: { tasks: Tasks }) => {
  const _tasks = Object.entries(tasks);
  if (!_tasks.length) return <p>No tasks yet</p>;
  return (
    <div>
      {_tasks.map(([taskId, task]) => {
        return <TaskItem task={task} key={taskId} />;}
      )}
    </div>
  );
};
