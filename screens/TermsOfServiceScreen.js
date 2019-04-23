import React from "react";
import { ActivityIndicator, View, Dimensions, Linking } from "react-native";
import HTML from "react-native-render-html";

import Background from "../components/Background";
import HeaderTitle from "../components/nav/HeaderTitle";
import HeaderBackIcon from "../components/nav/HeaderBack";
import Error from "../components/Error";

import i18n from "../translations";
import Url from "../constants/Urls";
import defaultStyles from "../constants/Styles";
import colors from "../constants/Colors";
import axios from "../store/axios";

const BackgroundImage = require("../assets/backgrounds/tos_wn.png");

// @see https://www.npmjs.com/package/react-native-render-html#styling
const classesStyles = {};
const tagsStyles = {
  h2: {
    color: "white",
    fontSize: 16,

    marginTop: 20,
    marginBottom: 4
  },
  p: {
    color: "#95989A",
    fontSize: 12
  }
};

class TermsOfServiceScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.tos"),
    headerTitle: HeaderTitle,
    headerLeft: (
      <HeaderBackIcon
        navigation={navigation}
        onPress={() => navigation.goBack()}
      />
    ),
    headerStyle: defaultStyles.headerTwoLines
  });

  state = {
    loading: true,
    content: "",
    error: ""
  };

  componentDidMount() {
    axios
      .get(Url.Account.GetTermsAndConditions(), {
        responseType: "text"
      })
      .then(response => {
        this.setState({
          loading: false,
          content: response.data
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: i18n.t("errors.tos.fetch")
        });
      });
  }

  openLink = (event, href) => {
    return Linking.openURL(href);
  };

  render() {
    const { loading, content, error } = this.state;

    return (
      <Background source={BackgroundImage}>
        {loading ? (
          <View style={[defaultStyles.container, defaultStyles.center]}>
            <ActivityIndicator color={colors.primary} size="large" />
          </View>
        ) : error ? (
          <Error message={error} />
        ) : (
          <View style={{ paddingHorizontal: 24, paddingVertical: 20 }}>
            <HTML
              html={content}
              imagesMaxWidth={Dimensions.get("window").width}
              tagsStyles={tagsStyles}
              classesStyles={classesStyles}
              onLinkPress={this.openLink}
            />
          </View>
        )}
      </Background>
    );
  }
}

export default TermsOfServiceScreen;
