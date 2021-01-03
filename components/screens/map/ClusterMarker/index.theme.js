import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
        countColor: theme.colors.white,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
