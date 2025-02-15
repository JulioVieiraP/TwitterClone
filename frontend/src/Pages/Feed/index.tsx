import axios from "axios";
import { useState, useEffect } from "react";
import Tweet from "../../Components/Tweet";
import TweetPost from "../../Components/TweetPost";
import * as S from './style';

const Feed = () => {
    const [feed, setFeed] = useState<Feed>([]);

    const fetchFeed = async () => {
        try {
            const response = await axios.get('/api/feeds');
            setFeed(response.data);
        } catch (error) {
            console.error("Erro ao buscar o feed:", error);
        }
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    return (
        <>
            <S.Header>
                <h1>Página inicial</h1>
            </S.Header>
            <TweetPost fetchFeed={fetchFeed} />
            <section>
                {feed.map((tweet) => (
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
        </>
    );
};

export default Feed;
