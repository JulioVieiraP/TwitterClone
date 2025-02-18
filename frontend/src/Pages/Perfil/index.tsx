import * as S from './style';
import Logo from '../../Components/Logo';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RiLink } from 'react-icons/ri';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import Tweet from '../../Components/Tweet';
import { useAuth } from '../../Context/useAuth';

const Perfil = () => {
  const { id } = useParams();
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/usuarios/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário:', error);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleFollow = async (targetUserId?: number) => {
    if (!targetUserId || !authUser) return;

    const isFollowing = user?.followers?.some(f => f.id === authUser?.id);

    setUser((prevUser) => {
      if (!prevUser) return prevUser;

      const updatedFollowers = isFollowing
        ? prevUser.followers?.filter(follower => follower.id !== authUser?.id) ?? []
        : [
            ...(prevUser.followers ?? []),
            {
              id: authUser?.id ?? 0,
              username: authUser?.username ?? 'Desconhecido',
              foto_perfil: authUser?.foto_perfil ?? null
            }
          ];

      return {
        ...prevUser,
        followers: updatedFollowers,
      } as UserProfile;
    });

    try {
        await axios.post(`/api/usuarios/${targetUserId}/follow/`);
        fetchData();
    } catch (error) {
      console.error('Erro ao seguir usuário:', error);

      // Caso haja erro, revertendo a alteração
      setUser((prevUser) => {
        if (!prevUser) return prevUser;

        const revertedFollowers = isFollowing
          ? [...(prevUser.followers ?? []), { id: authUser?.id ?? 0, username: authUser?.username ?? '', foto_perfil: authUser?.foto_perfil }]
          : prevUser.followers?.filter(follower => follower.id !== authUser?.id) ?? [];

        return {
          ...prevUser,
          followers: revertedFollowers,
        } as UserProfile;
      });
    }
  };

  const isFollowing = (userId: number | undefined) => {
    return (user?.followers ?? []).some(following => following.id === userId);
  };

  return (
    <S.PerfilContainer>
      <S.Header>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <IoArrowBackCircleOutline size={48} />
        </button>
        <div>
          <h1>{user?.username || 'Usuário'}</h1>
          <span>{user?.tweets?.length ?? 0} posts</span>
        </div>
      </S.Header>
      <main>
        <S.Banner>
          <img src={user?.banner ?? 'default-banner.png'} alt="Banner" />
        </S.Banner>
        <S.ProfileSection>
          <Logo src={user?.foto_perfil ?? 'default-avatar.png'} size={91} />
          {authUser?.id === user?.id ? (
            <S.EditButton onClick={() => navigate(`/editar-perfil/${user?.id}`)}>Editar perfil</S.EditButton>
          ) : (
            <S.EditButton onClick={() => handleFollow(user?.id)}>
              {isFollowing(user?.id) ? 'Seguindo' : 'Seguir'}
            </S.EditButton>
          )}
          <S.ProfileInfo>
            <h2>{user?.username ?? 'Nome não disponível'}</h2>
            <span>@{user?.username?.toLowerCase() ?? 'username'}</span>
            <p>{user?.bio ?? ''}</p>
            {user?.link && (
              <a href={user.link} target="_blank" rel="noopener noreferrer">
                <RiLink size={16} /> {user.link.replace(/^https?:\/\//, '')}
              </a>
            )}
            <S.FollowInfo>
              <span><strong>{user?.following?.length ?? 0}</strong> Seguindo</span>
              <span><strong>{user?.followers?.length ?? 0}</strong> Seguidores</span>
            </S.FollowInfo>
          </S.ProfileInfo>
        </S.ProfileSection>
        <section>
          {user?.tweets?.map(tweet => (
            <Tweet key={tweet.id} {...tweet} fetch={fetchData} />
          ))}
        </section>
      </main>
    </S.PerfilContainer>
  );
};

export default Perfil;
