import React, { useCallback } from 'react';
import './App.css';
import { TaskInput } from './Components/TaskInput';
import { TaskList } from './Components/TaskList';
import { Footer } from './Components/Footer';
import { useStore } from './store';

function App() {
  const {tasks, addTask} = useStore();

  const handleAddTask = useCallback(
    (task: string) => {
      addTask(task);
    },
    [addTask],
  );

  return (
    <div>
      <h1>Todo app</h1>
      <TaskInput handleAddTask={handleAddTask} />
      <TaskList tasks={tasks} />
      <Footer/>
    </div>
  );
}

export default App;
