import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
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
  width: 590px;
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

