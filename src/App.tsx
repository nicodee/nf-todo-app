import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AllTasks, CompletedTasks, ActiveTasks } from "./Containers";
import NoMatch from "./NoMatch";
import Layout from "./Containers/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AllTasks />} />
          <Route path="active" element={<ActiveTasks />} />
          <Route path="complete" element={<CompletedTasks />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
