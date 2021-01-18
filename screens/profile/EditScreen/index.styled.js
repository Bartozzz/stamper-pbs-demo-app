import styled from "styled-components/native";

const UPLOAD_HEIGHT = 120;

export const Form = styled.View`
  flex: 1;

  padding-top: 15px;
  margin-horizontal: 30px;
`;

export const ButtonContainer = styled.View`
  margin-vertical: 20px;
  margin-horizontal: 30px;
`;

export const Upload = styled.ImageBackground`
  justify-content: center;
  align-items: center;

  width: 100%;
  height: ${UPLOAD_HEIGHT};
`;

export const UploadText = styled.Text`
  margin-top: 5px;

  font-size: 10px;
  color: ${({ theme }) => theme.uploadTextColor};
`;
