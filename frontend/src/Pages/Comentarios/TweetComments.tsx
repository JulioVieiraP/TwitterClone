import { IoArrowBackCircleOutline } from 'react-icons/io5'
import * as S from './style'
import TweetPost from '../../Components/TweetPost'
import Tweet from '../../Components/Tweet'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const TweetComments = () => {
    const { id } = useParams<{ id: string }>();
    const [tweet, setTweet] = useState<Tweet | null>(null);
    const [comments, setComments] = useState<Tweet[]>([]);

    const fetchTweet = async () => {
        try {
            const response = await axios.get(`/api/tweets/${id}/`);
            setTweet(response.data);
        } catch (error) {
            console.error('Erro ao carregar o tweet:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/tweets/${id}/comment/`);
            setComments(response.data);
        } catch (error) {
            console.error('Erro ao carregar os comentários:', error);
        }
    };

    const handleCommentPost = async (formData: FormData) => {
        try {
            await axios.post(`/api/tweets/${id}/comment/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchComments(); 
        } catch (error) {
            console.error('Erro ao postar comentário:', error);
        }
    };

    useEffect(() => {
        fetchComments();
        fetchTweet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!tweet) {
        return <div>Carregando...</div>;
    }

    return (
        <S.CommentContainer>
            <S.HeaderComment>
                <button 
                    onClick={() => window.history.back()} 
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                    <IoArrowBackCircleOutline size={48} />
                </button>
                <div>
                    <h1>Voltar</h1>
                </div>
            </S.HeaderComment>

            <Tweet
                id={tweet.id}
                user={tweet.user}
                imagem={tweet.imagem}
                likes={tweet.likes}
                content={tweet.content}
                created_at={tweet.created_at}
                retweet_of={tweet.retweet_of}
                total_comments={tweet.total_comments}
                fetch={fetchComments}
            />

            <TweetPost 
                fetchFeed={fetchComments} 
                handleTweetPost={handleCommentPost} 
            />

            <div>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <Tweet
                            key={comment.id}
                            id={comment.id}
                            user={comment.user}
                            imagem={comment.imagem}
                            likes={comment.likes}
                            content={comment.content}
                            created_at={comment.created_at}
                            total_comments={comment.total_comments}
                            retweet_of={comment.retweet_of}
                        />
                    ))
                ) : (
                    <div>Sem comentários ainda.</div>
                )}
            </div>
        </S.CommentContainer>
    );
}

export default TweetComments;
