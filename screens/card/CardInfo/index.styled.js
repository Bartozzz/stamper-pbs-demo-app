import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { isIphoneX } from "react-native-iphone-x-helper";
import normalize from "react-native-normalize";
import Button from "../../../components/Button";

export const Carousel = styled.View`
  align-items: center;
  height: ${isIphoneX ? 380 : 300}px;
`;

export const TextIcon = styled(FontAwesome)`
  margin-horizontal: 10px;
`;

export const PaginationContainer = styled.View`
  padding-vertical: 8px;
  padding-horizontal: 1px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.pagination.backgroundColor};
  border-radius: 20px;
`;

export const SliderInnerContainer = styled.View`
  width: ${normalize(280, "width")}px;
  height: ${normalize(180, "height")}px;

  border-radius: 10px;
`;

export const SliderInnerSection = styled.View`
  flex: 1;
`;

export const CardNumber = styled.Text`
  margin-bottom: 10px;
  font-size: 9px;
  color: ${({ theme }) => theme.card.numberTextColor};
  padding-left: 20px;
`;

export const CardTitle = styled.Text`
  font-size: 10px;
  color: ${({ theme }) => theme.card.titleTextColor};
  padding-left: 20px;
`;

export const ValidToDate = styled.Text`
  font-size: 11px;
  text-align: right;
  color: ${({ theme }) => theme.card.validToDateTextColor};
`;

export const OpeningHoursContainer = styled.View`
  flex-direction: row;

  margin-bottom: 30px;
`;

export const OpeningHours = styled.Text`
  color: ${({ theme }) => theme.card.openingHoursTextColor};
`;

export const InfoContainer = styled.View`
  background-color: ${({ theme }) => theme.infoContainerBackground};
`;

export const Row = styled.View`
  align-items: center;

  min-height: 74px;

  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.row.color};
`;

export const TextDescriptionContainer = styled.View`
  flex: 1;
`;

export const TextDescription = styled.Text`
  margin-left: 24px;

  color: ${({ theme }) => theme.description.textColor};
  font-size: 14px;
  text-align: left;
  text-transform: uppercase;
`;

export const TextValue = styled.Text`
  margin-right: 24px;

  font-size: 14px;
  text-align: right;
`;

export const ActionCard = styled.View`
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;

  background-color: ${({ theme }) => theme.actionCard.backgroundColor};

  z-index: 9999;
  bottom: 0px;
  height: 265px;
`;

export const Close = styled(FontAwesome)`
  align-self: flex-end;

  margin-horizontal: 25px;
  margin-top: 25px;
`;

export const ActionCardImage = styled.Image`
  width: 80px;
  height: 80px;
  resize-mode: contain;
  align-self: center;
  margin-top: -15px;
`;

export const ActionCardName = styled.Text`
  text-align: center;
  font-size: 18px;
  font-family: ${({ theme }) => theme.actionCard.nameFontFamily};

  margin-top: 20px;
`;

export const ActionCardAddress = styled.Text`
  color: ${({ theme }) => theme.actionCard.address.textColor};
  font-size: 14px;
  font-family: ${({ theme }) => theme.actionCard.address.fontFamily};
  text-align: center;
`;

export const StyledButton = styled.View`
  width: 85%;

  align-self: center;
  margin-top: 20px;
`;

export const DescriptionTitle = styled.Text`
  align-self: flex-start;

  margin-left: 24px;
  margin-top: 24px;

  color: ${({ theme }) => theme.description.titleColor};
  font-size: 14px;
  text-align: left;
  text-transform: uppercase;
`;

export const DescriptionValue = styled.Text`
  margin-horizontal: 24px;
  margin-vertical: 24px;

  color: ${({ theme }) => theme.description.valueColor};
  font-size: 14px;
  text-align: justify;
`;

export const LearnMoreContainer = styled.View`
  flex: 1;
  margin-left: 24px;
  justify-content: space-between;

  align-items: center;

  min-height: 74px;

  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.row.color};
`;

export const LearnMore = styled.Text`
  color: ${({ theme }) => theme.learnMore.textColor};
  font-size: 14px;
`;

export const CollapseContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-right: 14px;
`;

export const ActionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  margin-right: 8px;

  width: 33px;
  height: 33px;

  border-radius: 19px;
  background-color: ${(props) =>
    props.active ? props.theme.normal.button : props.theme.inactive.button};
`;

export const Terms = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  height: 60px;

  background-color: ${({ theme }) => theme.terms.backgroundColor};
`;

export const TermsText = styled.Text`
  color: ${({ theme }) => theme.terms.textColor};
  font-size: 14px;
`;

export const ButtonStyled = styled(Button)`
  width: 85%;

  align-self: center;
  margin-top: 20px;
`;
