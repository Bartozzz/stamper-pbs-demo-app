import * as React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        borderRadius: theme.borderRadiusSm,
        borderWidth: "1px",

        normal: {
          backgroundColor: "transparent",
          borderColor: theme.colors.border,
        },
        focus: {
          backgroundColor: "transparent",
          borderColor: theme.colors.primary,
        },
        badge: {
          backgroundColor: theme.colors.black,
          textColor: theme.colors.white,
          fontFamily: "System",
        },
        text: {
          color: theme.colors.black,
          fontFamily: "System",
          fontSize: "14px",
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
