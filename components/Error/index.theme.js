import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";
import getFont from "../../helpers/getFont";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor: theme.colors.error,
        head: {
          fontSize: "14px",
          fontFamily: getFont("Poppins", "black", false),
          color: theme.colors.white,
        },
        text: {
          fontSize: "14px",
          fontFamily: theme.fontText,
          color: theme.colors.white,
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
