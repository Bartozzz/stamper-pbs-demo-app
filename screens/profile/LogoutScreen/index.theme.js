import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor: theme.colors.background100,
        containerShadowColor: theme.colors.black,
        logoutTextColor: theme.colors.black,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
