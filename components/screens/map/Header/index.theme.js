import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor: theme.colors.black,
        item: {
          fontFamily: "System",
          inactiveColor: theme.colors.disabled,
          activeColor: theme.colors.white,
        },
        itemBarColor: theme.colors.white,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
