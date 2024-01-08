import './App.css';
import { TaskInput } from './Components/TaskInput';
import { Footer } from './Components/Footer';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AllTasks, CompletedTasks, ActiveTasks } from './Containers';
import { Nav } from './Components/Nav';
import NoMatch from './NoMatch';

function App() {
  return (
    <div>
      <Routes>
        <Route
          element={
            <>
              <h1>Todo app</h1>
              <TaskInput />
              <Nav />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route
            path="/"
            element={
              <>
                <AllTasks />
                <Outlet />
              </>
            }
          />
          <Route path="/active" element={<ActiveTasks />} />
          <Route path="/complete" element={<CompletedTasks />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
