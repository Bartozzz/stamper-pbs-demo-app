import * as React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Linking
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import * as Routes from "../../navigation";

import Button from "../../components/forms/Button";
import Background from "../../components/Background";
import CardBackground from "../../components/screens/card/CardBackground";
import { formatDate } from "../../helpers/date";

const BackgroundImage = require("../../assets/backgrounds/prizes_wn.png");
const CardImage = require("../../assets/backgrounds/card.png");

class RewardCodeScreen extends React.Component {
  openLinkInBrowser = link => {
    return Linking.openURL(link);
  };

  render() {
    const { route } = this.props;
    const card = route.params?.card;

    return (
      <Background source={BackgroundImage} disableScroll>
        <View style={[defaultStyles.grow]}>
          <View style={styles.about}>
            <Image source={{ uri: card.iconUrl }} style={styles.aboutIcon} />
            <Text style={styles.aboutMerchant}>{card.merchantName}</Text>
            <Text style={styles.aboutTitle}>{card.title}</Text>
          </View>

          <View style={styles.code}>
            <Text style={styles.codeTitle}>{i18n.t("prizes.writeCode")}</Text>
            <Text style={styles.codeValue}>{card.collectOnlineCode}</Text>
          </View>
        </View>

        {!!card.collectOnlineUrl && (
          <View style={styles.buttonContainer}>
            <Button
              title={i18n.t("prizes.quickCollect")}
              onPress={() => this.openLinkInBrowser(card.collectOnlineUrl)}
            />
          </View>
        )}
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  // …
  about: {
    marginTop: 60,
    marginBottom: 40
  },
  aboutIcon: {
    alignSelf: "center",
    marginBottom: 20,

    width: 80,
    height: 80,

    borderWidth: 2,
    borderRadius: 40,
    borderColor: colors.primary
  },
  aboutMerchant: {
    marginBottom: 10,

    textTransform: "uppercase",
    textAlign: "center",
    color: colors.color
  },
  aboutTitle: {
    textAlign: "center",
    color: colors.disabled
  },

  code: {
    marginVertical: 20,
    marginHorizontal: 24,

    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: colors.primary
  },
  codeTitle: {
    marginTop: 50,
    marginBottom: 30,

    fontSize: 26,
    textAlign: "center",
    color: colors.primary
  },
  codeValue: {
    marginBottom: 50,

    fontSize: 28,
    textAlign: "center",
    color: colors.color
  },

  buttonContainer: {
    paddingVertical: 25,
    paddingHorizontal: 24
  }
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RewardCodeScreen);
