import styled from "styled-components";

export const LogoContainer = styled.div<{ size: number; isTwitterLogo?: boolean }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    ${({ isTwitterLogo }) => !isTwitterLogo && `
      border-radius: 50%;
      object-fit: cover;
    `}
  }
`;