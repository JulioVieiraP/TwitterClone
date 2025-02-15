import * as S from './style';

const Logo = ({ size = 40, src }: { size?: number, src: string | null | undefined }) => {
  const isTwitterLogo = src?.includes("Logo_Twitter");

  const imageUrl = src && !isTwitterLogo && !src.startsWith('http')
    ? `http://127.0.0.1:8000${src}`
    : src;

  return (
    <S.LogoContainer size={size} isTwitterLogo={isTwitterLogo}>
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Logo" 
          width="100%" 
          height="100%" 
        />
      )}
    </S.LogoContainer>
  );
};

export default Logo;
