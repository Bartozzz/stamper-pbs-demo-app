import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        height: "48px",
        borderRadius: theme.borderRadiusSm,
        fontFamily: "System",

        shadowColor: theme.colors.shadow,

        normal: {
          backgroundColor: theme.colors.primary,
          textColor: theme.colors.white,
        },
        disabled: {
          backgroundColor: theme.colors.disabled,
          textColor: theme.colors.white,
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
