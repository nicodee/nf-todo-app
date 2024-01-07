import React from 'react';
import './App.css';
import { TaskInput } from './Components/TaskInput';
import { Footer } from './Components/Footer';
import { Route, Routes } from 'react-router-dom';
import { AllTasks, CompletedTasks, ActiveTasks } from './Containers';
import { Nav } from './Components/Nav';

function App() {
  return (
      <div>
        <h1>Todo app</h1>
        <TaskInput />
        <Nav />
        <Routes>
          <Route path="/" element={<AllTasks/>} />
          <Route path="/active" element={<ActiveTasks />} />
          <Route path="/complete" element={<CompletedTasks />} />
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;
