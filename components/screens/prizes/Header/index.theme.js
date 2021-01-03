import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../../constants/theme";
import getFont from "../../../../helpers/getFont";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor: theme.colors.primary,
        idleFontFamily: theme.fontHead,
        activeFontFamily: getFont("poppins", "bold", false),
        textColor: theme.colors.white,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
