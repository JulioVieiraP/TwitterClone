import styled from "styled-components";

export const TweetContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 590px;
  background-color: #000;
  padding: 24px 32px;
  gap: 24px;
  border-bottom: 1px solid #2f3336;
`;

export const TweetContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .tweet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .user-info {
      display: flex;
      gap: 8px;
      color: #fff;

      .username {
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
      }

      .handle-time {
        font-weight: 400;
        font-size: 16.59px;
        color: #72767A;
      }
    }
  }

  .tweet-text {
    color: #fff;
    font-weight: 400;
    font-size: 16px;
    line-height: 18.96px;
    margin-bottom: 16px;
  }

  .tweet-image {
    width: 100%;
    border-radius: 16px;
    margin-bottom: 12px;
  }

  .tweet-actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #8899a6;
    gap: 34px;

    .action {
      display: flex;
      align-items: center;
      cursor: pointer;

      svg {
        margin-right: 8px;
      }

      &:hover {
        color: #1da1f2;
      }
    }
  }
`;