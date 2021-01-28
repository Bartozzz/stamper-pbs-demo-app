import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        normal: {
          imageContainer: {
            background: "#001432",
            borderColor: "#0046F5",
            borderRadius: "35px",
            borderWidth: "2px",
          },
          merchant: {
            fontFamily: theme.fontText,
            textColor: theme.colors.white,
          },
          title: {
            fontFamily: theme.fontText,
            textColor: theme.colors.disabled,
          },
          expiry: {
            textColor: theme.colors.label100,
          },
          cardNumber: {
            textColor: theme.colors.label100,
          },
        },
        selected: {
          imageContainer: {
            borderColor: theme.colors.label,
          },
          merchant: {
            textColor: theme.colors.white,
          },
          title: {
            textColor: theme.colors.label100,
          },
          expiry: {
            textColor: theme.colors.label100,
          },
          cardNumber: {
            textColor: theme.colors.label100,
          },
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
