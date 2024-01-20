import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
  return (
      <>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </>
  )
}

export default App;
