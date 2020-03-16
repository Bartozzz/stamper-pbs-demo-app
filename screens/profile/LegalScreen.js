import React from "react";

import Background from "../../components/Background";
import TermsAsHTML from "../../components/screens/terms/TermsAsHTML";
import Version from "../../components/helpers/Version";

import i18n from "../../translations";
import Url from "../../constants/Urls";
import axios from "../../store/axios";

const BackgroundImage = require("../../assets/backgrounds/tos_wn.png");

class LegalScreen extends React.Component {
  state = {
    loading: true,
    content: "",
    error: ""
  };

  componentDidMount() {
    axios
      .post(
        Url.Account.Legal(i18n.appLocale),
        {
          language: i18n.appLocale
        },
        {
          responseType: "text"
        }
      )
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

  render() {
    const { loading, content, error } = this.state;

    return (
      <Background source={BackgroundImage}>
        <TermsAsHTML loading={loading} error={error} content={content} />
        <Version />
      </Background>
    );
  }
}

export default LegalScreen;
