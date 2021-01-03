import * as React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";
import getFont from "../../helpers/getFont";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        borderRadius: "8px",
        borderWidth: "1px",

        normal: {
          backgroundColor: "transparent",
          borderColor: theme.colors.border,
        },
        focus: {
          backgroundColor: theme.colors.highlight,
          borderColor: theme.colors.primary,
        },
        badge: {
          backgroundColor: theme.colors.badge,
          textColor: theme.colors.white,
          fontFamily: getFont("poppins", "black", false),
        },
        text: {
          color: theme.colors.white,
          fontFamily: getFont(),
          fontSize: "14px",
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
