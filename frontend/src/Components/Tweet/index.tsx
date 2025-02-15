import * as S from './style'
import Logo from '../Logo';
import { TimeCalculator } from '../../Utils/timeSince';
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegHeart, FaHeart, FaRegComment  } from "react-icons/fa";

const Tweet = ({ user, imagem, likes, content, created_at, answer_of, retweet_of }: Tweet) => {
    const fotoPerfil = user?.foto_perfil 
        ? `http://127.0.0.1:8000${user.foto_perfil}` 
        : undefined;

    const Banner = imagem 
        ? `http://127.0.0.1:8000${imagem}` 
        : undefined;

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
                    <div className="action"><FaRegComment /> {answer_of}</div>
                    <div className="action"><AiOutlineRetweet /> {retweet_of}</div>
                    <div className="action">
                        {LikesCount > 0 ? <FaHeart color="red" /> : <FaRegHeart />} {LikesCount}
                    </div>
                </div>
            </S.TweetContent>
        </S.TweetContainer>
    );
};

export default Tweet;
