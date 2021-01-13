import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        // Header & footer
        wrapperBackground: theme.colors.white,
        wrapperBorderRadius: "5px",

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
            inactive: theme.colors.white100,
          },
          textColor: theme.colors.white,
          borderRadius: "19px",
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
