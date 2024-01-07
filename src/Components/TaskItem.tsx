import { memo, useCallback } from 'react';
import { TaskType } from '../types';
import { useStore } from '../store';

export const TaskItem = memo(({ task }: { task: TaskType }) => {
  const { markTaskAsCompleted, markTaskAsActive } = useStore();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      markTaskAsCompleted(task.id);
    } else {
      markTaskAsActive(task.id);
    }
  }, [markTaskAsActive, markTaskAsCompleted, task.id]);

  return (
    <p>
      <input
        data-testid="task-item"
        type="checkbox"
        id={task.id}
        name={task.id}
        value={task.completed.toString()}
        checked={task.completed}
        onChange={handleChange}
      />
      <label htmlFor={task.id}>{task.title}</label>
    </p>
  );
});
