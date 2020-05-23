import React from "react";

import * as Styled from "./index.styled";
import defaultStyles from "../../../constants/Styles";

export const Container = ({ children, style }) => {
  return (
    <Styled.Container style={[defaultStyles.center, style]}>
      {children}
    </Styled.Container>
  );
};

export const Icon = ({ source, width, height }) => {
  return <Styled.Icon width={width} height={height} source={source} />;
};

export const Heading = ({ children, style }) => {
  return <Styled.Heading style={style}>{children}</Styled.Heading>;
};

export const Subheading = ({ children, style }) => {
  return <Styled.Subheading style={style}>{children}</Styled.Subheading>;
};

export const Action = ({ children, style }) => {
  return <Styled.Action style={style}>{children}</Styled.Action>;
};
