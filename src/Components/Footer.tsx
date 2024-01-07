import { memo } from 'react';
import { useStore } from '../store';


export const Footer = memo(function Footer() {
  const {completedTasks, clearCompletedTasks} = useStore(
    state => ({
      clearCompletedTasks: state.clearCompletedTasks,
      completedTasks: Object.fromEntries(
        Object.entries(state.tasks).filter(
            ([, task]) => task.completed
        )
    )})
  );
  
  const tasksLength = Object.entries(completedTasks).length;
  if (tasksLength === 0) return null;
  return (
    <>
      <button onClick={clearCompletedTasks}>Clear Completed Tasks</button>
    </>
  );
});
