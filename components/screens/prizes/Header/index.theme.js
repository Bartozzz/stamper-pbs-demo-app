import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor: theme.colors.primary,
        idleFontFamily: "System",
        activeFontFamily: "System",
        textColor: theme.colors.white,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
