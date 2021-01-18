import styled from "styled-components/native";
import Button from "../../../components/Button";

export const List = styled.FlatList`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const ButtonContainer = styled.View`
  padding-vertical: 20px;
  padding-horizontal: 24px;
`;

export const ButtonMargin = styled(Button)`
  margin-vertical: 5px;
`;

export const ImageContainer = styled.View`
  width: 70px;
  height: 70px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.imageContainer.background};
  border-color: ${({ theme }) => theme.imageContainer.borderColor};
  border-width: ${({ theme }) => theme.imageContainer.borderWidth};
  border-style: solid;
  border-radius: ${({ theme }) => theme.imageContainer.borderRadius};
`;

export const Image = styled.Image`
  width: 70px;
  height: 70px;
`;

export const ItemOkIcon = styled.Image`
  position: absolute;
  top: 28px;
  right: 25px;

  width: 32px;
  height: 32px;
`;

export const Merchant = styled.Text`
  margin-top: 5px;

  font-size: 14px;
  font-family: ${({ theme }) => theme.merchant.fontFamily};
  color: ${({ theme }) => theme.merchant.color};
  text-transform: uppercase;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.title.fontFamily};
  color: ${({ theme }) => theme.title.color};
`;

export const OtherInformations = styled.View`
  margin-top: 5px;

  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const Expiry = styled.Text`
  width: 50%;

  font-size: 9px;
  color: ${({ theme }) => theme.expiry.textColor};
`;

export const CodeTitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.codeNumber.fontFamily};
`;

export const CardNumber = styled.Text`
  margin-top: 4px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.codeNumber.fontFamily};
`;

export const TextGenerationDate = styled.Text`
  margin-top: 5px;
  font-size: 9px;
  font-family: ${({ theme }) => theme.generationDate.fontFamily};
`;
