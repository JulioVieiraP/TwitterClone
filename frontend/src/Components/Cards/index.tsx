import Logo from "../Logo";
import * as S from "./style";

type Props = {
  title: string;
  trends?: Trend[];
  suggested?: UserProfile[];
  onFollow?: (id: number | undefined) => void;
  user?: UserProfile | null;
};

const Cards = ({ title, trends, suggested, onFollow, user  }: Props) => {

    const isFollowing = (userId: number | undefined) => {
        return (user?.following ?? []).some(following => following.id === userId);
    };
    
  return (
    <S.CardContainer>
      <S.CardTitle>{title}</S.CardTitle>
      <S.CardContent>
        {title === "O que está acontecendo" && trends ? (
          trends.map((trend) => (
            <S.ContentItem key={trend.id}>
              <div>
                <p>#{trend.nome}</p>
                <span>{trend.counter} posts</span>
              </div>
            </S.ContentItem>
          ))
        ) : title === "Quem seguir" && suggested ? (
          suggested.map((user) => (
            <S.ContentItem key={user.id}>
              <Logo src={user.foto_perfil} />
              <div className="user-info">
                <p>{user.username}</p>
                <span>@{user.username}</span>
              </div>
              <button onClick={() => onFollow?.(user.id)}>
                {isFollowing(user.id) ? "Seguindo" : "Seguir"}
              </button>
            </S.ContentItem>
          ))
        ) : (
          <p>No content available</p>
        )}
      </S.CardContent>
    </S.CardContainer>
  );
};

export default Cards;
