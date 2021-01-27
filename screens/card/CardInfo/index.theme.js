import React from "react";
import { ThemeProvider } from "styled-components/native";

import theme from "../../../constants/theme";
import getFont from "../../../helpers/getFont";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        pagination: {
          backgroundColor: theme.colors.primary,
        },

        card: {
          numberTextColor: theme.colors.info,
          titleTextColor: theme.colors.info,
          validToDateTextColor: theme.colors.white,
          openingHoursTextColor: theme.colors.white,
        },

        infoContainerBackground: theme.colors.white,

        description: {
          textColor: "#636363",
          titleColor: "#636363",
          valueColor: "#636363",
        },

        row: {
          color: "#efefef",
        },

        learnMore: {
          textColor: theme.colors.primary,
        },

        terms: {
          backgroundColor: theme.colors.primary,
          textColor: theme.colors.white,
        },

        actionCard: {
          backgroundColor: "#F8F8F8",
          nameFontFamily: getFont("Poppins", "medium", false),

          address: {
            textColor: "#77838F",
            fontFamily: theme.fontText,
          },
        },

        normal: {
          button: theme.colors.primary,
        },
        inactive: {
          button: "#dad9e3",
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
