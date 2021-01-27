import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../constants/theme";
import getFont from "../../../helpers/getFont";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        avatar: {
          borderColor: theme.colors.border,
          borderRadius: "35px",
        },
        login: {
          textColor: theme.colors.white,
          fontFamily: getFont("Poppins", "bold", false),
        },
        email: {
          textColor: theme.colors.info,
          fontFamily: theme.fontText,
        },
        menu: {
          backgroundColor: theme.colors.background,
          borderRadius: "10px",
        },
        menuSpacer: {
          backgroundColor: theme.colors.border,
        },
        menuItemText: {
          textColor: theme.colors.white,
          fontFamily: theme.fontHead,
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
