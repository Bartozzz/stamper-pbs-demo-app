import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const providerCardMargin = 10;
const providerCardSize =
  (Dimensions.get("window").width - providerCardMargin * 2) / 3 -
  providerCardMargin * 2;

export const About = styled.View`
  margin-top: 60px;
  margin-bottom: 40px;
`;

export const AboutIcon = styled.Image`
  align-self: center;
  margin-bottom: 20px;

  width: 80px;
  height: 80px;

  border-width: 2px;
  border-radius: 40px;
  border-color: ${({ theme }) => theme.aboutIconBorderColor};
`;

export const AboutMerchant = styled.Text`
  margin-bottom: 10px;

  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.aboutMerchantTextColor};
`;

export const AboutTitle = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.aboutTitleTextColor};
`;

export const Close = styled(AntDesign)`
  align-self: flex-end;
`;

export const Heading = styled.Text`
  margin-vertical: 20px;
  font-size: 20px;

  font-family: poppins-regular;
  text-align: center;
  color: #000000;
`;

export const PickText = styled.Text`
  margin-bottom: 20px;
  width: 90%;
  align-self: center;
  text-align: center;
  color: ${({ theme }) => theme.pickTextColor};
`;

export const Providers = styled.View`
  flex-warp: wrap;
  flex-direction: row;
  margin: ${providerCardMargin}px;
`;

export const Provider = styled.View`
  position: relative;
  margin: ${providerCardMargin}px;

  width: ${providerCardSize}px;
  height: ${providerCardSize}px;
`;

export const ProviderImage = styled.Image`
  width: ${providerCardSize}px;
  height: ${providerCardSize}px;
  resize-mode: contain;
`;

export const Code = styled.View`
  margin-vertical: 20px;
  margin-horizontal: 24px;

  border-width: 1px;
  border-radius: 8px;
  border-style: solid;
  border-color: ${({ theme }) => theme.codeTextColor};
`;

export const CodeTitle = styled.Text`
  margin-top: 50px;
  margin-bottom: 30px;

  font-size: 26px;
  text-align: center;
  color: ${({ theme }) => theme.codeTitleTextColor};
`;

export const CodeValue = styled.Text`
  margin-bottom: 50px;

  font-size: 28px;
  text-align: center;
  colors: ${({ theme }) => theme.codeValueTextColor};
`;

export const ButtonContainer = styled.View`
  padding-vertical: 25px;
  padding-horizontal: 24px;
`;

export const Card = styled.View`
  margin: 15px;
  padding: 15px;
  background-color: ${({ theme }) => theme.cardBackgroundColor};
`;
