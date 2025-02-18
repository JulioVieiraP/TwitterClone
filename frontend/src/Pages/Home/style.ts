import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 275px 600px 350px;
  gap: 32px;
  max-width: 1220px;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
`;

export const MainContainer = styled.main`
  border: 2px solid #161616;
  border-top: none;
  border-bottom: none;
  padding: 20px 0;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

