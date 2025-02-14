type Follower = {
    id: number;
    username: string;
    foto_perfil: string | null;
};
  
type Following = {
    id: number;
    username: string;
    foto_perfil: string | null;
};

type TweetLike = {
    user: string;
    foto_perfil: string | null;
};

type Tweet = {
    id?: number;
    user: {
        id?: number;
        username?: string;
        foto_perfil?: string | null;
    }
    imagem: string | null;
    likes: TweetLike[];
    content: string;
    created_at: string;
    answer_of?: number | null;
    retweet_of?: number | null;
    retweets?: Tweet[];
};

declare type UserProfile = {
    id?: number;
    username: string | undefined;
    email?: string;
    foto_perfil?: string | null;
    banner?: string | null;
    bio?: string | null;
    link?: string | null;
    followers?: Follower[];
    following?: Following[];
    tweets?: Tweet[];
};

type FeedTweet = Tweet;

declare type Feed = FeedTweet[];
