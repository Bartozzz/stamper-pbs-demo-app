import React from "react";

import Background from "../../components/Background";
import HeaderTitle from "../../components/HeaderTitle";
import HeaderBack from "../../components/HeaderBack";
import TermsAsHTML from "../../components/screens/terms/TermsAsHTML";

import i18n from "../../translations";
import Url from "../../constants/Urls";
import defaultStyles from "../../constants/Styles";
import axios from "../../store/axios";

import images from "../../constants/images";

class TermsOfServiceScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.tos"),
    headerTitle: HeaderTitle,
    headerLeft: (
      <HeaderBack navigation={navigation} onPress={() => navigation.goBack()} />
    ),
    headerStyle: defaultStyles.headerTwoLines,
  });

  state = {
    loading: true,
    content: "",
    error: "",
  };

  componentDidMount() {
    axios
      .post(
        Url.Account.TermsAndConditions(i18n.appLocale),
        {
          language: i18n.appLocale,
        },
        {
          responseType: "text",
        }
      )
      .then((response) => {
        this.setState({
          loading: false,
          content: response.data,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: i18n.t("errors.tos.fetch"),
        });
      });
  }

  render() {
    const { loading, content, error } = this.state;

    return (
      <Background source={images.BackgroundTOS}>
        <TermsAsHTML loading={loading} error={error} content={content} />
      </Background>
    );
  }
}

export default TermsOfServiceScreen;
