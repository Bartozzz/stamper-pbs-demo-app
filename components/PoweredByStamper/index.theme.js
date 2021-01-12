import * as React from "react";
import { ThemeProvider } from "styled-components/native";

export const Theme = ({ light, children }) => {
  return (
    <ThemeProvider theme={{ textColor: light ? "#ffffff" : "#000000" }}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;
