import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login/intex";
import Cadastro from "../Pages/Cadastro";
import Feed from "../Pages/Feed";
import Perfil from "../Pages/Perfil";
import EditPerfil from "../Pages/EditPerfil";
import { useAuth } from "../Context/useAuth";
import TweetComments from "../Pages/Comentarios/TweetComments";

const RouterView = () => {
  const {user} = useAuth()
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="Cadastro" element={<Cadastro />} />
      <Route path="Login" element={<Login />} />

      {/* Rotas dentro da Home (com navegação e hashtags) */}
      <Route path="/" element={<Home />}>
        <Route index element={<Feed />} />
        <Route path="editar-perfil/:id" element={<EditPerfil key={user?.id} />} />
        <Route path="perfil-usuario/:id" element={<Perfil />} />
        <Route path="/tweet/:id/comentarios" element={<TweetComments />} />
      </Route>
    </Routes>
  );
};

export default RouterView;
