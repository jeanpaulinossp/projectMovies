import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

const Rotas = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
    </Routes>
  );
};

export default Rotas;
