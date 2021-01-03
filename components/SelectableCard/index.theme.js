import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        borderWidth: "1px",
        borderRadius: theme.borderRadiusMd,

        selected: {
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.primary,
        },
        idle: {
          backgroundColor: theme.colors.border100,
          borderColor: theme.colors.border100,
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
