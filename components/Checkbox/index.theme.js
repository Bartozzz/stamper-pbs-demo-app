import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor: theme.colors.primary,
        textColor: theme.colors.link,
        borderColor: theme.colors.inputBorder,
        labelColor: theme.colors.link,
        borderRadius: theme.borderRadiusBg,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
