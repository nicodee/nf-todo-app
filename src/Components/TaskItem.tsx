import { useCallback, useState } from 'react';
import { TaskType } from '../types';

export const TaskItem = ({ task }: { task: TaskType }) => {
  const [checked, setChecked] = useState<boolean>(task.completed);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  }, []);

  return (
    <p>
      <input
        data-testid="task-item"
        type="checkbox"
        id={task.id}
        name={task.id}
        value={task.completed.toString()}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={task.id}>{task.title}</label>
    </p>
  );
};
