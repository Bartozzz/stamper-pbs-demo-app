import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        orLoginWithColor: theme.colors.white,
        logInWithBackgroundColor: theme.colors.white,

        // Either black (null passed as a string) or white due to Apple design guidelines
        iconTint: "null",
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
