import * as S from './style'
import Logo from '../../Components/Logo';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../Context/useAuth';


const Cadastro = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {RegisterUser} = useAuth()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        RegisterUser(username, email, password)
    }
    return (
        <S.ContainerCadastro>
            <div>
                <Logo src="/assets/Logo_Twitter.png" size={80}/>
                <S.TitleCadastro>Crie sua conta</S.TitleCadastro>
                <S.FormCadastro onSubmit={handleSubmit}>
                    <S.InputCadastro type="text" placeholder="Digite o seu nome" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <S.InputCadastro type="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <S.InputCadastro type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <S.ButtonCadastro>Entrar</S.ButtonCadastro>
                </S.FormCadastro>
                <Link to="/Login">Já tem uma conta? <strong>Entrar no X</strong></Link>
            </div>
        </S.ContainerCadastro>
    );
};

export default Cadastro;
