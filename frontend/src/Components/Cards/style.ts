import styled from "styled-components";

export const CardContainer = styled.div`
    width: 352px;
    border-radius: 24px;
    background-color: #1A1A1A;
    padding: 16px;
    margin: 16px 0;
`;

export const CardTitle = styled.h2`
    color: #FFFFFF;
    font-size: 20px;
    margin-bottom: 12px;
`;

export const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ContentItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #FFFFFF;

    div{
        p {
            font-weight: 500;
            font-size: 16px;
            line-height: 19px;
            margin-bottom: 4px;
        }

        span {
            font-weight: 400;
            font-size: 14px;
            color: #72767A;
        }
    }

    .user-info {
        display: flex;
        flex-direction: column;
        margin-right: auto;

        p {
            font-weight: 500;
            font-size: 16px;
            line-height: 19px;
        }

        span {
            font-weight: 400;
            font-size: 14px;
            color: #72767A;
        }
    }

    button {
        background-color: #FFFFFF;
        color: #000000;
        border: none;
        border-radius: 20px;
        padding: 6px 16px;
        font-weight: 500;
        cursor: pointer;
    }
`;