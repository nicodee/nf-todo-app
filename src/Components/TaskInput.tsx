import { memo, useCallback, useState } from 'react';
import { useStore } from '../store';


export const TaskInput = memo(function TaskInput() {
  const {addTask} = useStore();
  const [task, setTask] = useState<string>('');

  const handleAddTask = useCallback(
    (task: string) => {
      addTask({ 
        id: Date.now().toString(),
        title: task, 
        completed: false 
      });
    },
    [addTask],
  );
  
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  }, []);

  const handleClick = useCallback(() => {
    if (!task) return;
    handleAddTask(task);
    setTask('');
  }, [handleAddTask, task]);


  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleClick();
      }
    },
    [handleClick],
  );

  return (
    <div>
      <input
        data-testid="task-input"
        placeholder="Create some tasks ..."
        onChange={handleChange}
        value={task}
        onKeyUp={handleKeyUp}
      />

      <button data-testid="add-task-button" onClick={handleClick} disabled={!task}>
        Add Task
      </button>
    </div>
  );
});
