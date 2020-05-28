import React from "react";

import i18n from "../../translations";
import * as Styled from "./index.styled";

const getErrorMessage = (error) => {
  if (Array.isArray(error)) {
    if (error.length) {
      return error.join(". ") + ".";
    }
  } else if (error) {
    return error + ".";
  } else {
    return i18n.t("errorInternal");
  }
};

export const Error = ({ message }) => {
  const hasError = Boolean(message);

  if (!hasError) {
    return null;
  }

  return (
    <Styled.ErrorContainer>
      <Styled.ErrorHead>{i18n.t("error")}:</Styled.ErrorHead>
      <Styled.ErrorText testID="error-message">
        {getErrorMessage(message)}
      </Styled.ErrorText>
    </Styled.ErrorContainer>
  );
};

export default Error;
