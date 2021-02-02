import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        titleFontFamily: "System",
        titleColor: theme.colors.white,
        titleShadow: theme.colors.shadow,

        subtitleColor: theme.colors.info,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
