import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, NotFound } from "./components/pages";
function App() {
  return (
    <div className="flex w-screen min-h-screen flex-col items-center justify-between ">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/dashboard/banner" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
