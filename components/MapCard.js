import React from "react";
import styled from "styled-components/native";
import { ScrollView, View, TouchableOpacity, Linking } from "react-native";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  FontAwesome,
  Foundation,
  Entypo,
} from "@expo/vector-icons";
import normalize from "react-native-normalize";

import colors from "../constants/Colors";
import i18n from "../translations";

export const slideWidth = 300;
export const slideMargin = 6;
export const slidePadding = 10;

const CardWrapper = styled.View`
  margin: ${slideMargin}px;

  background-color: ${colors.color};
  border-radius: 5px;
`;

const CardSection = styled.View`
  display: ${({ show }) => (show ? "flex" : "none")};
  min-height: ${normalize(250)}px;

  padding-top: ${({ alternateColor }) => (alternateColor ? slidePadding : 0)}px;
  padding-bottom: ${({ alternateColor }) =>
    alternateColor ? slidePadding * 2 : 0}px;
  background-color: ${({ alternateColor }) =>
    alternateColor ? colors.primary : colors.color};
`;

const CardName = styled.Text`
  margin: ${slidePadding}px;

  font-size: 16px;
  font-weight: bold;
`;

const CardBackgroundImage = styled.Image`
  margin-bottom: ${slidePadding}px;
  width: ${slideWidth - slideMargin}px;
  height: ${slideWidth * 0.3}px;
  resize-mode: cover;
`;

const CardLogoImageContainer = styled.View`
  position: absolute;
  align-self: center;
  overflow: hidden;
  z-index: 2;

  margin: ${slidePadding}px;
  width: ${(slideWidth - slidePadding * 2) * 0.3 - 20}px;
  height: ${(slideWidth - slidePadding * 2) * 0.3 - 20}px;
  borderRadius: ${((slideWidth - slidePadding * 2) * 0.3 - 20) / 2}px;
`;

const CardLogoImage = styled.Image.attrs((props) => ({
  resizeMode: "contain",
}))`
  width: ${(slideWidth - slidePadding * 2) * 0.3 - 20}px;
  height: ${(slideWidth - slidePadding * 2) * 0.3 - 20}px;

  background-color: white;
`;

const CardItem = styled.View`
  flex-direction: row;

  margin-horizontal: ${slidePadding}px;
  margin-vertical: ${slidePadding / 2}px;
`;

const CardItemIcon = styled.Text`
  margin-right: 5px;
  text-align: center;

  width: 20px;
`;

const CardItemText = styled.Text`
  padding-right: ${slidePadding * 2}px;
  color: ${({ alternateColor, invalid }) =>
    invalid ? "red" : alternateColor ? colors.color : "#000"};
`;

const CardDescription = styled.Text`
  color: ${colors.color};
  margin: ${slidePadding}px;
`;

const CardFooter = styled.View`
  flex-direction: row;
  padding: ${slidePadding}px;
`;

const CardFooterButtons = styled.View`
  flex-direction: row;
  width: 130px;
`;

const CardFooterButton = styled.View`
  align-items: center;
  justify-content: center;

  margin-right: 7px;

  width: 37px;
  height: 37px;

  background-color: ${({ active }) => (active ? colors.primary : "#dad9e3")};
  border-radius: 19px;
`;

const CardFooterAddCardButton = styled.View`
  align-items: center;
  justify-content: center;

  width: ${slideWidth - 130 - slidePadding * 3}px;
  height: 37px;

  background-color: ${({ active }) => (active ? colors.primary : "#dad9e3")};
  border-radius: 19px;
`;

const CardFooterAddCardButtonText = styled.Text`
  color: ${colors.color};
`;

function openLink(url) {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    }
  });
}

function noop() {
  // Does nothing
}

const MapCard = (props) => {
  const [flip, setFlip] = React.useState(false);

  const handleFlipButtonClick = React.useCallback(() => {
    setFlip((flip) => !flip);
  }, []);

  const handleLinkButtonClick = React.useCallback((url) => {
    openLink(url.startsWith("http") ? url : `https://${url}`);
  }, []);

  const handlePhoneButtonClick = React.useCallback((phoneNumber) => {
    openLink(`tel:${phoneNumber.replace(/-| /g, "")}`);
  }, []);

  const hasPhoneNumber = !!props.phone;
  const hasCommerceLink = !!props.ecommerceUrl;
  const isCardActive = !props.inWallet && props.active;

  return (
    <CardWrapper>
      <CardName>{props.merchantName}</CardName>

      <CardSection show={!flip}>
        <View>
          <CardLogoImageContainer>
            <CardLogoImage source={{ uri: props.logoUrl }} />
          </CardLogoImageContainer>
          <CardBackgroundImage source={{ uri: props.backgroundImageUrl }} />
        </View>

        <CardItem>
          <CardItemIcon>
            <AntDesign name="tag" size={18} color="#c1c0ca" />
          </CardItemIcon>

          <CardItemText>{props.title}</CardItemText>
        </CardItem>

        <CardItem>
          <CardItemIcon>
            <Feather name="clock" size={18} color="#c1c0ca" />
          </CardItemIcon>

          <CardItemText invalid={!props.active}>
            {props.validTo
              ? i18n.t("map.validTill", { date: props.validToDate })
              : i18n.t("map.validDays", { count: props.validDays })}
          </CardItemText>
        </CardItem>

        <CardItem>
          <CardItemIcon>
            <MaterialIcons name="monetization-on" size={18} color="#c1c0ca" />
          </CardItemIcon>

          <ScrollView style={{ height: 70 }}>
            <CardItemText>{props.cardDescription}</CardItemText>
          </ScrollView>
        </CardItem>
      </CardSection>

      <CardSection alternateColor show={flip}>
        <ScrollView style={{ flexGrow: 0, height: 130 }}>
          <CardDescription>{props.companyDescription}</CardDescription>
        </ScrollView>

        <CardItem>
          <CardItemIcon>
            <Entypo name="link" size={18} color="#000" />
          </CardItemIcon>

          <CardItemText alternateColor>{props.website}</CardItemText>
        </CardItem>

        <CardItem>
          <CardItemIcon>
            <Foundation name="marker" size={18} color="#000" />
          </CardItemIcon>

          <CardItemText alternateColor>{props.address}</CardItemText>
        </CardItem>

        <CardItem>
          <CardItemIcon>
            <FontAwesome name="bell" size={18} color="#000" />
          </CardItemIcon>

          <CardItemText alternateColor>{props.openingHours}</CardItemText>
        </CardItem>
      </CardSection>

      <CardFooter>
        <CardFooterButtons>
          <TouchableOpacity onPress={handleFlipButtonClick}>
            <CardFooterButton active={!!props.companyDescription}>
              <Entypo name="dots-three-horizontal" size={20} color="#fff" />
            </CardFooterButton>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              hasPhoneNumber ? handlePhoneButtonClick(props.phone) : noop()
            }
          >
            <CardFooterButton active={hasPhoneNumber}>
              <FontAwesome name="phone" size={20} color="#fff" />
            </CardFooterButton>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              hasCommerceLink
                ? handleLinkButtonClick(props.ecommerceUrl)
                : noop()
            }
          >
            <CardFooterButton active={hasCommerceLink}>
              <Entypo name="shopping-cart" size={16} color="#fff" />
            </CardFooterButton>
          </TouchableOpacity>
        </CardFooterButtons>

        <TouchableOpacity
          onPress={() => (isCardActive ? props.onAddCard(props.id) : noop())}
        >
          <CardFooterAddCardButton active={isCardActive}>
            <CardFooterAddCardButtonText>
              {i18n.t("map.addCard")}
            </CardFooterAddCardButtonText>
          </CardFooterAddCardButton>
        </TouchableOpacity>
      </CardFooter>
    </CardWrapper>
  );
};

export default MapCard;
