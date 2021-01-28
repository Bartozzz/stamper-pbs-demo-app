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

  background-color: ${({ theme }) => theme.normal.imageContainer.background};
  border-color: ${(props) =>
    props.selected
      ? props.theme.selected.imageContainer.borderColor
      : props.theme.normal.imageContainer.borderColor};
  border-width: ${({ theme }) => theme.normal.imageContainer.borderWidth};
  border-style: solid;
  border-radius: ${({ theme }) => theme.normal.imageContainer.borderRadius};
`;

export const Image = styled.Image`
  width: 70px;
  height: 70px;
`;

export const Merchant = styled.Text`
  margin-top: 5px;

  font-size: 14px;
  font-family: ${({ theme }) => theme.normal.merchant.fontFamily};
  color: ${(props) =>
    props.selected
      ? props.theme.selected.merchant.textColor
      : props.theme.normal.merchant.textColor};
  text-transform: uppercase;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.normal.title.fontFamily};
  color: ${(props) =>
    props.selected
      ? props.theme.selected.title.textColor
      : props.theme.normal.title.textColor};
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
  color: ${(props) =>
    props.selected
      ? props.theme.selected.expiry.textColor
      : props.theme.normal.expiry.textColor};
`;

export const CardNumber = styled.Text`
  width: 50%;

  font-size: 9px;
  text-align: right;
  color: ${(props) =>
    props.selected
      ? props.theme.selected.cardNumber.textColor
      : props.theme.normal.cardNumber.textColor};
`;
