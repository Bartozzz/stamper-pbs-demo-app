import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../../constants/theme";

export const Theme = ({ dark, children }) => {
  return (
    <ThemeProvider
      theme={{
        backgroundColor: theme.colors.error100,
        borderRadius: theme.borderRadiusMd,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
