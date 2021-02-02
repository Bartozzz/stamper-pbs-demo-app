import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor: theme.colors.black,
        textColor: theme.colors.white,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
