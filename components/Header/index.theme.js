import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor: theme.colors.primary,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
