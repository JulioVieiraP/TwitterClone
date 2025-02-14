import Logo from '../Logo';
import * as S from './style'

type Props = {
    title: string;
    content?: string[];
}



const Cards = ({ title }: Props) => {
    return (
        <S.CardContainer>
            <S.CardTitle>{title}</S.CardTitle>
            <S.CardContent>
                {title === 'O que está acontecendo' ? (
                    <>
                        <S.ContentItem>
                            <div>
                                <p>#B7WebFullstack</p>
                                <span>2,066 posts</span>
                            </div>
                        </S.ContentItem>
                    </>
                ) : (
                    <>
                        <S.ContentItem>
                            <Logo src="/profile.jpg"/>
                            <div className="user-info">
                                <p>Ava Williams</p>
                                <span>@avawilliams</span>
                            </div>
                            <button>Seguir</button>
                        </S.ContentItem>
                        <S.ContentItem>
                            <Logo src="/profile2.jpg"/>
                            <div className="user-info">
                                <p>Evan Jones</p>
                                <span>@evanjones</span>
                            </div>
                            <button>Seguir</button>
                        </S.ContentItem>
                    </>
                )}
            </S.CardContent>
        </S.CardContainer>
    );
};

export default Cards;
