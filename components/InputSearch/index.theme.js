import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";
import getFont from "../../helpers/getFont";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        borderRadius: theme.borderRadiusMd,

        fontFamily: getFont("Nunito", "regular", false),

        backgroundColor: "#1a5bf1",
        textColor: theme.colors.info,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
