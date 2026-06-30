import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MeterReading from "./pages/MeterReading/MeterReading";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reading" element={<MeterReading />} />
    </Routes>
  );
}

export default App;