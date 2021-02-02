import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        textColor: theme.colors.white,
        fontFamily: "System",
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
