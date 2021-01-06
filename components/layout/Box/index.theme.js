import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor: theme.colors.background,
        headingColor: theme.colors.white,
        subheadingColor: theme.colors.white,
        actionColor: theme.colors.info,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
