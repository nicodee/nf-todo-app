import { memo } from 'react';
import { useStore } from '../store';


export const Footer = memo(function Footer() {
  const { tasks, clearCompletedTasks } = useStore();
  if (tasks.length === 0) return null;
  return (
    <>
      <button onClick={clearCompletedTasks}>Clear all tasks</button>
    </>
  );
});
