import React, { Component } from "react";
import i18n from "../translations";
import colors from "../constants/Colors";
import layout from "../constants/Layout";
import styled from "styled-components/native";

const ErrorContainer = styled.View`
  padding: 10;
  marginVertical: 10;

  width: 100%;
  backgroundColor: ${colors.error};
  borderRadius: 5
`;

const ErrorHead =  styled.Text`
  fontSize: 14;
  fontFamily: ${layout.fontHead};
  color: ${colors.color}
`;

const ErrorText = styled.Text`
  fontSize: 14;
  fontFamily: ${layout.fontText};
  color: ${colors.color}
`;

class Error extends Component {
  get message() {
    const { message } = this.props;

    if (Array.isArray(message)) {
      return message.join(". ");
    } else if (typeof message === "string") {
      return message;
    } else {
      return i18n.t("errorInternal");
    }
  }

  render() {
    const message = this.message;

    if (!message) {
      return null;
    }

    return (
      <ErrorContainer>
        <ErrorHead>{i18n.t("error")}:</ErrorHead>
        <ErrorText>{message}</ErrorText>
      </ErrorContainer>
    );
  }
}

export default Error;
