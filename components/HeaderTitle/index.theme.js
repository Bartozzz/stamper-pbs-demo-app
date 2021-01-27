import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";
import getFont from "../../helpers/getFont";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        textColor: theme.colors.white,
        fontFamily: getFont("Poppins", "bold", false),
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
