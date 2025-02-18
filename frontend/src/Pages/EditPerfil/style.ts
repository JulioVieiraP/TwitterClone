import styled from "styled-components";
import {Header, Banner, ProfileSection, ProfileInfo, FollowInfo} from '../Perfil/style'

export const EditContainer = styled.div`
  color: white;
  background-color: #000;
`;

export const HeaderEdit = styled(Header)``;
export const EditBanner = styled(Banner)``;
export const EditProfileSection = styled(ProfileSection)`
border: none
`;
export const EditProfileInfo = styled(ProfileInfo)``;
export const EditFollowInfo = styled(FollowInfo)``;

export const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 528px;
    margin: 0 auto;

    label {
        font-size: 18px;
        font-weight: 400;
        line-height: 21.33px;
        margin: 8px;
        color: #72767A;
    }

    input, textarea {
        width: 100%;
        padding: 18px;
        border-radius: 48px;
        border: 2px solid #161616;
        background: #000000;
        color: white;
        margin-bottom: 16px;
        font-size: 16px;
        outline: none;
    }

    textarea {
        resize: none;
        height: 80px;
        border-radius: 24px !important;
    }

    button {
        margin-top: 20px;
        padding: 12px;
        background: white;
        color: black;
        border: none;
        border-radius: 30.66px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
            background: #ddd;
        }
    }
`;

export const LogoWrapper = styled.div`
  width: 91px;
  height: 91px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


export const ErrorMessage = styled.span`
    font-size: 12px;
    color: #ff5555;
    margin-top: 4px;
`;