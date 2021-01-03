import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ dark, children }) => {
  return (
    <ThemeProvider
      theme={{
        titleColor: dark ? theme.colors.black : theme.colors.white,
        subtitleColor: theme.colors.info,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
