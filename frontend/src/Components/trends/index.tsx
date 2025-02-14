import Cards from '../Cards';
import * as S from './style'

const Trends = () => {
    return (
        <S.AsideContainer>
            <S.SearchBar type="text" placeholder="Buscar" />
            <Cards title="O que está acontecendo"/>
            <Cards title="Quem seguir"/>
        </S.AsideContainer>
    )
}

export default Trends;