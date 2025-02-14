import * as S from './style';
import Logo from '../Logo';
import { useAuth } from '../../Context/useAuth';
import { CiImageOn } from "react-icons/ci";

const TweetPost = () => {
    const { user } = useAuth();
    const imagemFormatada = `http://127.0.0.1:8000${user?.foto_perfil}`;

    return (
        <S.TweetPostContainer>
            <div>
                <Logo src={imagemFormatada} size={51} />
            </div>
            <S.TweetForm>
                <textarea placeholder="O que está acontecendo?" />
                <div>
                    <label htmlFor="upload-image">
                        <CiImageOn size={24} />
                    </label>
                    <input id="upload-image" type="file" accept="image/*" style={{ display: "none" }} />
                    
                    <button type="submit">Postar</button>
                </div>
            </S.TweetForm>
        </S.TweetPostContainer>
    );
};

export default TweetPost;
