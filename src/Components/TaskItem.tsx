import { memo, useCallback, useState } from 'react';
import { TaskType } from '../types';
import { useStore } from '../store';

export const TaskItem = memo(function TaskItem({ task }: { task: TaskType }) {
  const { deleteTask, markTaskAsCompleted, markTaskAsActive } = useStore();
  const [editMode, setEditMode] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      markTaskAsCompleted(task.id);
    } else {
      markTaskAsActive(task.id);
    }
  }, [markTaskAsActive, markTaskAsCompleted, task.id]);

  const handleToggleEditMode = useCallback(() => {
    setEditMode(prev => !prev);
  }, []);

  const handleDeleteTask = useCallback(() => {
    window.confirm('Are you sure you want to delete this task?') && deleteTask(task.id);
  }, [deleteTask, task.id]);


  if (editMode) {
    return (
      <EditTask task={task} toggleEditMode={handleToggleEditMode}/>
    )
  }

  return (
    <p>
      <span>
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
      </span>
      <span>
        <button onClick={handleToggleEditMode}>Edit</button>
        <button onClick={handleDeleteTask}>Delete</button>
      </span>
    </p>
  );
});


const EditTask = memo(function EditTask({ task, toggleEditMode }: { task: TaskType; toggleEditMode: () => void }) {
  const { editTask } = useStore();
  const [newTask, setTask] = useState<string>(task.title);

  const handleSaveEditedTask = useCallback(() => {
    if (!newTask) {
      alert('Task cannot be empty');
      toggleEditMode();
      return;
    };
    editTask( task.id, newTask);
    toggleEditMode();
  }, [editTask, newTask, task.id, toggleEditMode]);


  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  }, []);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSaveEditedTask();
      }
    },
    [handleSaveEditedTask],
  );

  return (
    <p>
      <span>
        <input
          data-testid="edit-task-item"
          id={task.id}
          name={task.id}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          type="text"
          value={newTask}
        />
      </span>
      <span>
        <button onClick={toggleEditMode}>Cancel</button>
        <button onClick={handleSaveEditedTask}>Save</button>
      </span>
    </p>
  )
});