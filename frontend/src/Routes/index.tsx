import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login/intex";
import Cadastro from "../Pages/Cadastro";
import Feed from "../Pages/Feed";
import Perfil from "../Pages/Perfil";
import EditPerfil from "../Pages/EditPerfil";
import TweetComments from "../Pages/Comentarios/TweetComments";

const RouterView = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Home />}>
        <Route index element={<Feed />} />
        <Route path="editar-perfil/:id" element={<EditPerfil />} />
        <Route path="perfil-usuario/:id" element={<Perfil />} />
        <Route path="tweet/:id/comentarios" element={<TweetComments />} />
      </Route>
    </Routes>
  );
};

export default RouterView;
