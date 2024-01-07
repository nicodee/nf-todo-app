import { memo } from 'react';
import { useStore } from '../store';


export const Footer = memo(function Footer() {
  const { tasks, clearCompletedTasks } = useStore();
  const tasksLength = Object.entries(tasks).length;
  if (tasksLength === 0) return null;
  return (
    <>
      <button onClick={clearCompletedTasks}>Clear Completed Tasks</button>
    </>
  );
});
