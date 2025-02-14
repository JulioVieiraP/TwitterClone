import styled from "styled-components";

export const Sidebar = styled.aside`
  width: 280px;
  height: 600px;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;

  div {
    nav {
      margin-top: 46px;
    }
  }
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    font-size: 18px;
    padding: 10px 0;
    cursor: pointer;

    a {
      display: flex;
      align-items: center;
      gap: 24px;
      text-decoration: none;
      color: #71767b;
      font-weight: 500;
      transition: color 0.3s ease;

      &:hover {
        color: white;
      }
    }

    .active {
      color: white;
      font-weight: bold;
    }
  }
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #71767b;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  cursor: pointer;

  span{
    font-weight: 300;
    font-size: 18px;
    line-height: 21.33px;
    color: #72767A;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 156px;
  height: 40px;

  div{
    span{
      color: #FFFFFF;
      font-weight: 400;
      font-size: 14px;
      line-height: 16.59px;
      margin-bottom: 4px;
    }

    p {
      color: #72767A;
      font-weight: 400;
      font-size: 14px;
      line-height: 16.59px;
    }
  }
`;
