import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;

    div{
        a{
            color: #fff;
            font-size: 14px;
            margin-top: 16px;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
`;

export const Title = styled.h1`
    font-weight: 500;
    line-height: 37.92px;
    font-size: 32px;
    margin: 48px 0;
    color: #fff;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 300px;
`;

export const Input = styled.input`
    padding: 12px;
    border-radius: 24px;
    border: 1px solid #333;
    background-color: #000;
    color: #fff;
    font-size: 16px;

    &::placeholder {
        color: #888;
    }
`;

export const Button = styled.button`
    padding: 12px;
    margin-bottom: 40px;
    border-radius: 24px;
    background-color: #fff;
    color: #000;
    font-size: 16px;
    font-weight: bold;
    border: none;
    cursor: pointer;
`;