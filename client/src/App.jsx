import { useState } from "react";
import { BroserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BroserRouter>
      <Routes>
        <route path="/" element={<Home />} />
        <route path="/about" element={<About />} />
        <route path="/dashboard" element={<Dashboard />} />
        <route path="/sign-in" element={<Signin />} />
        <route path="/sign-up" element={<SignUp />} />
        <route path="/projects" element={<Projects />} />
      </Routes>
    </BroserRouter>
  );
}

export default App;
