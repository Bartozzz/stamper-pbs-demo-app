import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        avatar: {
          borderColor: theme.colors.border,
          borderRadius: "35px",
        },
        login: {
          textColor: theme.colors.black,
          fontFamily: "System",
        },
        email: {
          textColor: theme.colors.black,
          fontFamily: "System",
        },
        menu: {
          backgroundColor: theme.colors.background200,
          borderRadius: "10px",
        },
        menuSpacer: {
          backgroundColor: theme.colors.border,
        },
        menuItemText: {
          textColor: theme.colors.black,
          fontFamily: "System",
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
