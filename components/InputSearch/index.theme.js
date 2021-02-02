import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        borderRadius: theme.borderRadiusMd,

        fontFamily: "System",

        backgroundColor: theme.colors.white,
        textColor: theme.colors.black,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
