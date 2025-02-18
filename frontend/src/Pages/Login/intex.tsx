import * as S from './style'
import Logo from '../../Components/Logo';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth';
import { useState } from 'react';


const Login = () => {
    const { loginUser } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginUser(username, password);
    };
    
    return (
        <S.Container>
            <div>
                <Logo src="/assets/Logo_Twitter.png" size={80}/>
                <S.Title>Entre na sua conta</S.Title>
                <S.Form onSubmit={handleSubmit}>
                    <S.Input type="text" placeholder="Digite seu Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <S.Input type="password" placeholder="Digite a sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <S.Button>Entrar</S.Button>
                </S.Form>
                <Link to="/Cadastro">Ainda não tem uma conta? <strong>Cadastre-se</strong></Link>
            </div>
        </S.Container>
    );
};

export default Login;
