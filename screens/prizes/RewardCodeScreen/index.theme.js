import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../constants/theme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        aboutIconBorderColor: theme.colors.primary,
        aboutMerchantTextColor: theme.colors.white,
        aboutTitleTextColor: theme.colors.disabled,
        headingFontFamily: theme.fontHead,
        textFontFamily: theme.fontHead,
        textColor: theme.colors.black,
        pickTextColor: theme.colors.disabled,
        codeBorderColor: theme.colors.primary,
        codeTitleTextColor: theme.colors.primary,
        codeValueTextColor: theme.colors.white,
        cardBackgroundColor: theme.colors.white,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
