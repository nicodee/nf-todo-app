import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AllTasks, CompletedTasks, ActiveTasks } from "./Containers";
import NoMatch from "./NoMatch";
import Layout from "./Containers/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<AllTasks />} />
        <Route path="active" element={<ActiveTasks />} />
        <Route path="complete" element={<CompletedTasks />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
