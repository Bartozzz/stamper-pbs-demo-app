import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../constants/theme";
import getFont from "../../helpers/getFont";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        height: "48px",
        borderRadius: theme.borderRadiusSm,
        fontFamily: getFont("poppins", "bold", false),

        shadowColor: theme.colors.shadow,

        normal: {
          backgroundColor: theme.colors.primary,
          textColor: theme.colors.white,
        },
        disabled: {
          backgroundColor: theme.colors.disabled,
          textColor: theme.colors.white,
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
