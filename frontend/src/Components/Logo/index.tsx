import * as S from './style'

const Logo = ({ size = 40, src }: { size?: number, src: string | null | undefined }) => {
  const isTwitterLogo = src?.includes("Logo_Twitter");
  
  return (
    <S.LogoContainer size={size} isTwitterLogo={isTwitterLogo}>
      {src && (
        <img 
          src={src} 
          alt="Logo" 
          width="100%" 
          height="100%" 
          style={isTwitterLogo ? { filter: "invert(1)" } : {}} />
      )}
    </S.LogoContainer>
  );
};

export default Logo;
