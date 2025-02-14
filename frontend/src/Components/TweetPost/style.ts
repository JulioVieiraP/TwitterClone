import styled from "styled-components";

export const TweetPostContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 590px;
  height: 144px;
  padding: 16px 32px;
  border-top: 2px solid #161616;
  border-bottom: 2px solid #161616;
`;

export const TweetForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 20px;

  textarea {
    background-color: transparent;
    border: none;
    color: #fff;
    font-weight: 300;
    font-size: 20px;
    line-height: 23.7px;
    resize: none;
    margin-bottom: 8px;

    &:focus {
      outline: none;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    background-color: #fff;
    color: #000;
    border: none;
    padding: 8px 16px;
    border-radius: 30.66px;
    font-weight: bold;

    &:hover {
      background-color: #e1e8ed;
    }
  }
`;