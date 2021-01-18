import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        imageContainer: {
          background: "#001432",
          borderColor: "#0046F5",
          borderRadius: "35px",
          borderWidth: "2px",
        },
        merchant: {
          fontFamily: theme.fontText,
          color: theme.colors.white,
        },
        title: {
          fontFamily: theme.fontText,
          color: theme.colors.disabled,
        },
        expiry: {
          textColor: theme.colors.label100,
        },
        cardNumber: {
          fontFamily: theme.fontText,
        },
        generationDate: {
          fontFamily: theme.fontText,
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
