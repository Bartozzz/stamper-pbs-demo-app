import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor: theme.colors.primary,

        iconColor: theme.colors.white,
        closeColor: theme.colors.white,

        placeholderColor: theme.colors.white,
        textColor: theme.colors.white,
        fontFamily: "System",
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
