import React from "react";
import { Platform } from "react-native";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../../constants/theme";
import getFont from "../../../../helpers/getFont";

export const Theme = ({ dark, children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor:
          Platform.OS === "ios" ? "rgba(255, 255, 255, 0.1)" : "#1a2c47",
        borderRadius: theme.borderRadiusMd,
        ID: {
          fontFamily: getFont("nunito", "black", false),
          textColor: theme.colors.disabled,
        },
        imageBorderRadius: theme.borderRadiusBg,
        title: {
          fontFamily: getFont("poppins", "bold", false),
          textColor: theme.colors.white,
        },
        expiry: {
          fontFamily: theme.fontText,
          textColor: theme.colors.disabled,
        },
        amount: {
          fontFamily: theme.fontText,
          textColor: theme.colors.disabled,
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
