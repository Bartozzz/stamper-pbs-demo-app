import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor: theme.colors.primary,

        iconColor: theme.colors.white,
        closeColor: theme.colors.info,

        placeholderColor: theme.colors.white,
        textColor: theme.colors.white,
        fontFamily: theme.fontText,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
