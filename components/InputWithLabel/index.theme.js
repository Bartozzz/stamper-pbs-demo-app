import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";
import getFont from "../../helpers/getFont";

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

        fontFamily: getFont("nunito", "regular", false),
        textColor: theme.colors.white,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
