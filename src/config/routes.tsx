import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";

const Rotas = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Search />} path="/search" />
    </Routes>
  );
};

export default Rotas;
