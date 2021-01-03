import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";
import getFont from "../../helpers/getFont";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        titleFontFamily: getFont("poppins", "bold", false),
        titleColor: theme.colors.white,
        titleShadow: theme.colors.shadow,

        subtitleColor: theme.colors.info,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
