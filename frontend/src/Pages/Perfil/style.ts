import styled from "styled-components";

export const PerfilContainer = styled.div`
  color: white;
  background-color: #000;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #000;

  button {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }

  div {
    margin-left: 16px;

    h1 {
      font-size: 20px;
      font-weight: bold;
    }

    span {
      font-size: 14px;
      color: #71767b;
    }
  }
`;

export const Banner = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 169px;
    object-fit: cover;
  }
`;

export const ProfileSection = styled.section`
    display: flex;
    align-items: flex-start;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    margin-top: -45.5px;
    border-bottom: 1px solid #2f3336;
    position: relative;

    img {
        border: 4px solid #000;
        border-radius: 50%;
    }
`;

export const ProfileInfo = styled.div`
  margin-top: 18px;

  h2 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 4px;
  }

  span {
    font-size: 14px;
    color: #71767b;
    margin-bottom: 24px;
  }

  p {
    margin: 16px 0;
  }

  a {
    color: #1d9bf0;
    font-size: 14px;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const FollowInfo = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #71767b;
  margin-top: 28px;

  span strong {
    color: white;
  }
`;

export const EditButton = styled.button`
  position: absolute;
  right: 16px;
  top: 51px;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: bold;
  color: #000;
  background-color: #fff;
  border-radius: 20px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #e7e7e7;
  }
`;