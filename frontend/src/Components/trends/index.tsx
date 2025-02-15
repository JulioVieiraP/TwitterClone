import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../Cards";
import * as S from "./style";
import { useAuth } from "../../Context/useAuth";

const Trends = () => {
  const [trendingTopics, setTrendingTopics] = useState<Trend[]>([]);
  const [suggested, setSuggested] = useState<UserProfile[]>([]);
  const { user, setUser } = useAuth();

  useEffect(() => {
    fetchTrendingTopics();
    fetchSuggested();
  }, []);

  const fetchTrendingTopics = async () => {
    try {
      const response = await axios.get("/api/trends/");
      setTrendingTopics(response.data);
    } catch (error) {
      console.error("Erro ao buscar trends:", error);
    }
  };

  const fetchSuggested = async () => {
    try {
      const response = await axios.get("/api/usuarios/");
      const allUsers: UserProfile[] = response.data;
      const randomUsers = allUsers.sort(() => 0.5 - Math.random()).slice(0, 4);
      setSuggested(randomUsers);
    } catch (error) {
      console.error("Erro ao buscar usuários sugeridos:", error);
    }
  };

  const followUser = async (id: number | undefined) => {
    if (!id || !user) return;

    const isFollowing = (user?.following ?? []).some(following => following.id === id);

    try {
        await axios.post(`/api/usuarios/${id}/follow/`);

        setUser((prevUser) => {
            if (!prevUser) return prevUser;

            return {
                ...prevUser,
                following: isFollowing
                    ? prevUser.following?.filter(following => following.id !== id) ?? []
                    : [...(prevUser.following ?? []), { id, username: "", foto_perfil: null }],
            };
        });

        setSuggested((prevSuggested) =>
            prevSuggested.map((user) =>
                user.id === id ? { ...user, isFollowing: !isFollowing } : user
            )
        );
    } catch (error) {
        console.error(error);
    }
  };



  return (
    <S.AsideContainer>
      <S.SearchBar type="text" placeholder="Buscar" />
      <Cards title="O que está acontecendo" trends={trendingTopics} />
      <Cards title="Quem seguir" suggested={suggested} onFollow={followUser} user={user} />
    </S.AsideContainer>
  );
};

export default Trends;
