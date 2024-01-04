import { TaskType } from '../types';
import { TaskItem } from './TaskItem';

export const TaskList = ({ tasks }: { tasks: TaskType[] }) => {
  if (!tasks.length) return <p>No tasks yet</p>;
  return (
    <div>
      {tasks.map((task: TaskType) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </div>
  );
};
