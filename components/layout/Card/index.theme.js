import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor: theme.colors.background100,
        titleColor: theme.colors.black,
        titleFontFamily: "System",
        subtitleColor: theme.colors.black,
        subtitleFontFamily: "System",
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
