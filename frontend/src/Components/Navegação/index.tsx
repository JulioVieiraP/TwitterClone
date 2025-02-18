import { NavLink } from "react-router-dom";
import * as S from './style';
import { FaHome, FaUser } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import Logo from "../Logo";
import { useAuth } from "../../Context/useAuth";
import { URL } from "../../App";



const Navegacao = ({username, foto_perfil, email}: UserProfile ) => {
  const {user ,logout} = useAuth()
  const imagemFormatada = `${URL}${foto_perfil}`
  return (
    <S.Sidebar>
      <div>
        <Logo size={32} src="/assets/Logo_Twitter.png"/> 
        <nav>
          <S.NavList>
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                <FaHome size={20} /> Página inicial
              </NavLink>
            </li>
            <li>
              <NavLink to={`perfil-usuario/${user?.id}`} className={({ isActive }) => isActive ? "active" : ""}>
                <FaUser size={20} /> Meu Perfil
              </NavLink>
            </li>
          </S.NavList>
        </nav>
      </div>

      <div>
        <S.LogoutButton onClick={logout}>
          <RiLogoutBoxLine size={20} /> <span>Sair</span>
        </S.LogoutButton>
        <S.ProfileContainer>
          {foto_perfil && (
            <Logo src={imagemFormatada} size={40}/>
          )}
          <div>
            <span>{username}</span>
            <p>{email}</p>
          </div>
        </S.ProfileContainer>
      </div>
    </S.Sidebar>
  );
};

export default Navegacao;
