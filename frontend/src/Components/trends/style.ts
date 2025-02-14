import styled from "styled-components";

export const AsideContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 0;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 24px;
  border: none;
  background-color: #2f2f2f;
  color: #fff;
  font-size: 16px;
  margin-bottom: 16px;

  &::placeholder {
    color: #888;
  }
`;