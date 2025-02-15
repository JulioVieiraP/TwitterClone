import * as S from './style';
import Logo from '../Logo';
import { useAuth } from '../../Context/useAuth';
import { CiImageOn } from "react-icons/ci";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

const tweetSchema = z.object({
    content: z.string()
        .min(1, "O tweet não pode estar vazio")
        .max(280, "O tweet pode ter no máximo 280 caracteres"),
    image: z.instanceof(File).optional(),
});

type TweetFormData = z.infer<typeof tweetSchema>;

type TweetPostProps = {
    fetchFeed: () => void;
};

const TweetPost = ({ fetchFeed }: TweetPostProps) => {
    const { user } = useAuth();
    const imagemFormatada = `http://127.0.0.1:8000${user?.foto_perfil}`;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, setValue, reset } = useForm<TweetFormData>({
        resolver: zodResolver(tweetSchema),
    });

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setValue("image", file);
        }
    };

    const handleTweetPost = async (data: TweetFormData) => {
        try {
            setIsSubmitting(true);
    
            const formData = new FormData();
            formData.append("content", data.content);
            
            if (data.image instanceof File) {
                formData.append("imagem", data.image);
            }
    
            await axios.post("/api/tweets/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            fetchFeed();
    
            reset();
            setSelectedImage(null);
        } catch (error) {
            console.error("Erro ao postar tweet:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTextareaResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
    };
    

    return (
        <S.TweetPostContainer>
            <div>
                <Logo src={imagemFormatada} size={51} />
            </div>
            <S.TweetForm onSubmit={handleSubmit(handleTweetPost)}>
                <textarea
                    placeholder="O que está acontecendo?"
                    {...register("content")}
                    onInput={handleTextareaResize}
                />

                {selectedImage && (
                    <img className="tweet-image" src={selectedImage} alt="Preview" />
                )}

                <div>
                    <label htmlFor="upload-image">
                        <CiImageOn size={24} />
                    </label>
                    <input
                        id="upload-image"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Postando..." : "Postar"}
                    </button>
                </div>
            </S.TweetForm>
        </S.TweetPostContainer>
    );
};

export default TweetPost;
