import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../constants/theme";
import getFont from "../../../helpers/getFont";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor: theme.colors.white,
        titleColor: theme.colors.background,
        titleFontFamily: getFont("Poppins", "bold", false),
        subtitleColor: theme.colors.label,
        subtitleFontFamily: theme.fontText,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
