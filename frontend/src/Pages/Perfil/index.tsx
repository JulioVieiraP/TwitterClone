import * as S from './style';
import Logo from '../../Components/Logo';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RiLink } from "react-icons/ri";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Tweet from '../../Components/Tweet';

const Perfil = () => {
    const { id } = useParams();
    const [user, setUser] = useState<UserProfile | null>(null);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/usuarios/${id}`);
                setUser(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Erro ao buscar os dados do usuário:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <S.PerfilContainer>
            <S.Header>
                <button onClick={() => window.history.back()} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <IoArrowBackCircleOutline size={48} />
                </button>
                <div>
                    <h1>{user?.username || 'Usuário'}</h1>
                    <span>{user?.tweets?.length || 0} posts</span>
                </div>
            </S.Header>

            <main>
                <S.Banner>
                    <img src={user?.banner || 'default-banner.png'} alt="Banner" />
                </S.Banner>

                <S.ProfileSection>
                    <Logo src={user?.foto_perfil || 'default-avatar.png'} size={91} />
                    <S.EditButton onClick={() => navigate(`/editar-perfil/${user?.id}`)}>Editar perfil</S.EditButton>
                    <S.ProfileInfo>
                        <h2>{user?.username || 'Nome não disponível'}</h2>
                        <span>@{user?.username?.toLowerCase() || 'username'}</span>
                        <p>{user?.bio || ''}</p>
                        {user?.link && (
                            <a href={user.link} target="_blank" rel="noopener noreferrer">
                                <RiLink size={16} /> 
                                {user.link.replace(/^https?:\/\//, '')}
                            </a>
                        )}
                        <S.FollowInfo>
                            <span>
                                <strong>{user?.following?.length || 0}</strong> Seguindo
                            </span>
                            <span>
                                <strong>{user?.followers?.length || 0}</strong> Seguidores
                            </span>
                        </S.FollowInfo>
                    </S.ProfileInfo>
                </S.ProfileSection>

                <section>
                    {user?.tweets?.map((tweet) => (
                        <Tweet 
                            key={tweet.id}
                            user={tweet.user}
                            imagem={tweet.imagem}
                            likes={tweet.likes}
                            content={tweet.content}
                            created_at={tweet.created_at}
                            retweets={tweet.retweets}
                        />
                    ))}
                </section>
            </main>
        </S.PerfilContainer>
    );
};

export default Perfil;
