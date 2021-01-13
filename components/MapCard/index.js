import React from "react";
import { ScrollView, View, TouchableOpacity, Linking } from "react-native";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  FontAwesome,
  Foundation,
  Entypo,
} from "@expo/vector-icons";

import Theme from "./index.theme";
import * as Styled from "./index.styled";
import i18n from "../../translations";

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

export const MapCard = (props) => {
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
    <Theme>
      <Styled.CardWrapper>
        <Styled.CardName>{props.merchantName}</Styled.CardName>

        <Styled.CardSection testID="card-not-fliped" show={!flip}>
          <View>
            <Styled.CardLogoImageContainer>
              <Styled.CardLogoImage source={{ uri: props.logoUrl }} />
            </Styled.CardLogoImageContainer>
            <Styled.CardBackgroundImage
              source={{ uri: props.backgroundImageUrl }}
            />
          </View>

          <Styled.CardItem>
            <Styled.CardItemIcon>
              <AntDesign name="tag" size={18} color="#c1c0ca" />
            </Styled.CardItemIcon>

            <Styled.CardItemText>{props.title}</Styled.CardItemText>
          </Styled.CardItem>

          <Styled.CardItem>
            <Styled.CardItemIcon>
              <Feather name="clock" size={18} color="#c1c0ca" />
            </Styled.CardItemIcon>

            <Styled.CardItemText invalid={!props.active}>
              {props.validTo
                ? i18n.t("map.validTill", { date: props.validToDate })
                : i18n.t("map.validDays", { count: props.validDays })}
            </Styled.CardItemText>
          </Styled.CardItem>

          <Styled.CardItem>
            <Styled.CardItemIcon>
              <MaterialIcons name="monetization-on" size={18} color="#c1c0ca" />
            </Styled.CardItemIcon>

            <ScrollView style={{ height: 70 }}>
              <Styled.CardItemText>{props.cardDescription}</Styled.CardItemText>
            </ScrollView>
          </Styled.CardItem>
        </Styled.CardSection>

        <Styled.CardSection testID="card-fliped" alternateColor show={flip}>
          <ScrollView style={{ flexGrow: 0, height: 130 }}>
            <Styled.CardDescription>
              {props.companyDescription}
            </Styled.CardDescription>
          </ScrollView>

          <Styled.CardItem>
            <Styled.CardItemIcon>
              <Entypo name="link" size={18} color="#000" />
            </Styled.CardItemIcon>

            <Styled.CardItemText alternateColor>
              {props.website}
            </Styled.CardItemText>
          </Styled.CardItem>

          <Styled.CardItem>
            <Styled.CardItemIcon>
              <Foundation name="marker" size={18} color="#000" />
            </Styled.CardItemIcon>

            <Styled.CardItemText alternateColor>
              {props.address}
            </Styled.CardItemText>
          </Styled.CardItem>

          <Styled.CardItem>
            <Styled.CardItemIcon>
              <FontAwesome name="bell" size={18} color="#000" />
            </Styled.CardItemIcon>

            <Styled.CardItemText alternateColor>
              {props.openingHours}
            </Styled.CardItemText>
          </Styled.CardItem>
        </Styled.CardSection>

        <Styled.CardFooter>
          <Styled.CardFooterButtons>
            <TouchableOpacity
              testID="toggle-flip"
              onPress={handleFlipButtonClick}
            >
              <Styled.CardFooterButton
                testID="company-description"
                active={!!props.companyDescription}
              >
                <Entypo name="dots-three-horizontal" size={20} color="#fff" />
              </Styled.CardFooterButton>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                hasPhoneNumber ? handlePhoneButtonClick(props.phone) : noop()
              }
            >
              <Styled.CardFooterButton
                testID="phone-number"
                active={hasPhoneNumber}
              >
                <FontAwesome name="phone" size={20} color="#fff" />
              </Styled.CardFooterButton>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                hasCommerceLink
                  ? handleLinkButtonClick(props.ecommerceUrl)
                  : noop()
              }
            >
              <Styled.CardFooterButton
                testID="commerce-link"
                active={hasCommerceLink}
              >
                <Entypo name="shopping-cart" size={16} color="#fff" />
              </Styled.CardFooterButton>
            </TouchableOpacity>
          </Styled.CardFooterButtons>

          <TouchableOpacity
            onPress={() =>
              isCardActive
                ? props.onAddCard(props.id, props.title, props.merchantName)
                : noop()
            }
          >
            <Styled.CardFooterAddCardButton
              testID="add-card"
              active={isCardActive}
            >
              <Styled.CardFooterAddCardButtonText>
                {i18n.t("map.addCard")}
              </Styled.CardFooterAddCardButtonText>
            </Styled.CardFooterAddCardButton>
          </TouchableOpacity>
        </Styled.CardFooter>
      </Styled.CardWrapper>
    </Theme>
  );
};

export default MapCard;
