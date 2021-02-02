import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        borderRadius: "100px",
        borderWidth: "1px",

        errorColor: theme.colors.error,
        focusColor: theme.colors.white,
        idleColor: theme.colors.inputBorder,
        labelColor: theme.colors.label,

        fontFamily: "System",
        textColor: theme.colors.white,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
