import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login/intex";
import Cadastro from "../Pages/Cadastro";
import Feed from "../Pages/Feed";

const RouterView = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="Cadastro" element={<Cadastro />} />
      <Route path="Login" element={<Login />} />

      {/* Rotas dentro da Home (com navegação e hashtags) */}
      <Route path="/" element={<Home />}>
        <Route index element={<Feed />} />
        <Route path="meu-perfil" element={<h1>meu perfil</h1>} />
        <Route path="editar-perfil" element={<h1>editar perfil</h1>} />
        <Route path="perfil-usuario/:id" element={<h1>perfil de um usuario</h1>} />
      </Route>
    </Routes>
  );
};

export default RouterView;
