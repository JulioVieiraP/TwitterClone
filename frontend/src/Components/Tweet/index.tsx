import * as S from './style'
import Logo from '../Logo';
import { TimeCalculator } from '../../Utils/timeSince';
// import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../App';

const Tweet = ({id ,user, imagem, likes, content, created_at, fetch, total_comments }: Tweet) => {

    const navigate = useNavigate()

    const formatUrl = (url?: string) => {
        if (!url) return undefined;
        return url.startsWith('https') ? url : `${URL}${url}`;
    };

    const handleLike = async () => {
        try {
          await axios.post(`/api/tweets/${id}/like/`);

          if (fetch) {
            fetch();
          }
          
        } catch (error) {
          console.error("Erro ao curtir o tweet:", error);
        }
      };

    const fotoPerfil = formatUrl(user?.foto_perfil || '');
    const Banner = formatUrl(imagem || '');

    const LikesCount = likes?.length ?? 0;
    const username = user?.username ?? "Usuário desconhecido";
    const timeAgo = TimeCalculator(created_at);

    return (
        <S.TweetContainer>
            <div>
                {fotoPerfil && <Logo src={fotoPerfil} size={48} />}
            </div>
            <S.TweetContent>
                <div className="tweet-header">
                    <div className="user-info">
                        <span className="username">{username}</span>
                        <span className="handle-time">@{username} · {timeAgo}</span>
                    </div>
                </div>
                <div className="tweet-text">{content}</div>
                {Banner && <img className="tweet-image" src={Banner} alt="Tweet" />}
                <div className="tweet-actions">
                    <div className="action" onClick={() => navigate(`/tweet/${id}/comentarios`)}><FaRegComment /> {total_comments}</div>
                    {/* <div className="action"><AiOutlineRetweet /> {retweet_of}</div> */}
                    <div className="action" onClick={handleLike} style={{ cursor: 'pointer' }}>
                        {LikesCount > 0 ? <FaHeart color="red" /> : <FaRegHeart />} {LikesCount}
                    </div>
                </div>
            </S.TweetContent>
        </S.TweetContainer>
    );
};

export default Tweet;
