import React from "react";
import { ActivityIndicator, View, Dimensions } from "react-native";
import HTML from "react-native-render-html";

import Background from "../components/Background";
import Error from "../components/Error";

import i18n from "../translations";
import Url from "../constants/Urls";
import defaultStyles from "../constants/Styles";
import colors from "../constants/Colors";
import axios from "../store/axios";

const BackgroundImage = require("../assets/backgrounds/tos.png");

// @see https://www.npmjs.com/package/react-native-render-html#styling
const classesStyles = {};
const tagsStyles = {
  p: { color: "white" }
};

class TermsOfServiceScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.tos")
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
      .catch(error => {
        this.setState({
          loading: false,
          error: i18n.t("errors.tos.fetch")
        });
      });
  }

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
          <HTML
            html={content}
            imagesMaxWidth={Dimensions.get("window").width}
            tagsStyles={tagsStyles}
            classesStyles={classesStyles}
          />
        )}
      </Background>
    );
  }
}

export default TermsOfServiceScreen;
