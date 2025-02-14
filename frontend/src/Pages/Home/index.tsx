import { Outlet } from "react-router-dom";
import * as S from './style'
import Navegacao from "../../Components/Navegação";
import { useAuth } from "../../Context/useAuth";
import Trends from "../../Components/trends";



const Home = () => {
  const {user} = useAuth()
  return (
    <S.Container>
      <Navegacao
        email={user?.email} 
        foto_perfil={user?.foto_perfil} 
        username={user?.username}
      />
      
      <S.MainContainer>
        <Outlet /> 
      </S.MainContainer>

      <Trends />
    </S.Container>
  );
};

export default Home;
