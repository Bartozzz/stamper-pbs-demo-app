import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        // Header & footer
        wrapperBackground: theme.colors.white,
        wrapperBorderRadius: theme.borderRadiusSm,

        normal: {
          cardBackground: theme.colors.white,
          cardItemText: theme.colors.black,
        },
        focused: {
          cardBackground: theme.colors.primary,
          cardItemText: theme.colors.white,
          cardDescription: theme.colors.white,
        },
        invalid: {
          cardItemText: "red",
        },

        footerButton: {
          backgroundColor: {
            active: theme.colors.primary,
            inactive: theme.colors.background200,
          },
          textColor: theme.colors.white,
          borderRadius: theme.borderRadiusMd,
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
