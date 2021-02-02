import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor: theme.colors.error,
        head: {
          fontSize: "14px",
          fontFamily: "System",
          color: theme.colors.white,
        },
        text: {
          fontSize: "14px",
          fontFamily: "System",
          color: theme.colors.white,
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
