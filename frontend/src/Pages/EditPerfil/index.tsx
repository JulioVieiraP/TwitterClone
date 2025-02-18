import * as S from './style';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const schema = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
    bio: z.string().max(160, "A bio pode ter no máximo 160 caracteres.").optional(),
    link: z.string().url("Insira um link válido.").optional(),
    image: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof schema>;

const EditPerfil = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState<UserProfile>();

    const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
    const [banner, setBanner] = useState<File | null>(null);
    const [fotoPerfilPreview, setFotoPerfilPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, setValue  } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/usuarios/${id}`);
                setUser(response.data);

                setValue("nome", response.data.username || '');
                setValue("bio", response.data.bio || '');
                setValue("link", response.data.link || '');

                
                setBannerPreview(response.data.banner);
                setFotoPerfilPreview(response.data.foto_perfil);
            } catch (error) {
                console.error('Erro ao buscar os dados do usuário:', error);
            }
        };
        fetchData();
    }, [id, setValue]);

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
        setPreview: React.Dispatch<React.SetStateAction<string | null>>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data: FormData) => {
        const formData = new FormData();
        formData.append("username", data.nome);
        if (data.bio) formData.append("bio", data.bio);
        if (data.link) formData.append("link", data.link);
        if (fotoPerfil) formData.append("foto_perfil", fotoPerfil);
        if (banner) formData.append("banner", banner);
        if (user?.email) formData.append("email", user.email);

        try {
            const response = await axios.put(`/api/usuarios/${user?.id}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            setUser(response.data);
            navigate(`/perfil-usuario/${user?.id}`);
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            alert("Ocorreu um erro ao atualizar o perfil.");
        }
    };

    return (
        <S.EditContainer>
            <S.HeaderEdit>
                <button 
                    onClick={() => window.history.back()} 
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                    <IoArrowBackCircleOutline size={48} />
                </button>
                <div>
                    <h1>Editar perfil</h1>
                </div>
            </S.HeaderEdit>

            <main>
                <S.EditBanner onClick={() => document.getElementById("bannerInput")?.click()}>
                    <img src={bannerPreview || 'default-banner.png'} alt="Banner" />
                </S.EditBanner>
                
                <S.EditProfileSection onClick={() => document.getElementById("fotoPerfilInput")?.click()}>
                    <S.LogoWrapper>
                        <img src={fotoPerfilPreview || 'default-avatar.png'} />
                    </S.LogoWrapper>
                </S.EditProfileSection>

                <S.EditForm onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        type="file" 
                        id="fotoPerfilInput" 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        onChange={(e) => handleFileChange(e, setFotoPerfil, setFotoPerfilPreview)}
                    />
                    <input 
                        type="file" 
                        id="bannerInput" 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                        onChange={(e) => handleFileChange(e, setBanner, setBannerPreview)} 
                    />
                    <label>Nome</label>
                    <input {...register("nome")} placeholder="Digite seu nome" />
                    {errors.nome && <S.ErrorMessage>{errors.nome.message}</S.ErrorMessage>}

                    <label>Bio</label>
                    <textarea {...register("bio")} placeholder="Fale um pouco sobre você" />
                    {errors.bio && <S.ErrorMessage>{errors.bio.message}</S.ErrorMessage>}

                    <label>Link</label>
                    <input {...register("link")} placeholder="Digite seu link" />
                    {errors.link && <S.ErrorMessage>{errors.link.message}</S.ErrorMessage>}

                    <button type="submit">Salvar alterações</button>
                </S.EditForm>
            </main>
        </S.EditContainer>
    );
}

export default EditPerfil;
