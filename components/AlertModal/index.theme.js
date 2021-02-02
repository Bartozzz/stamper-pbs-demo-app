import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        fontSize: "22px",
        fontFamily: "System",
        color: theme.colors.black,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
