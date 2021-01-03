import React from "react";

import Theme from "./index.theme";
import * as Styled from "./index.styled";
import defaultStyles from "../../../constants/Styles";

export const Container = ({ children, style }) => {
  return (
    <Theme>
      <Styled.Container style={[defaultStyles.center, style]}>
        {children}
      </Styled.Container>
    </Theme>
  );
};

export const Icon = ({ source, width, height }) => {
  return (
    <Theme>
      <Styled.Icon width={width} height={height} source={source} />
    </Theme>
  );
};

export const Heading = ({ children, style }) => {
  return (
    <Theme>
      <Styled.Heading style={style}>{children}</Styled.Heading>
    </Theme>
  );
};

export const Subheading = ({ children, style }) => {
  return (
    <Theme>
      <Styled.Subheading style={style}>{children}</Styled.Subheading>
    </Theme>
  );
};

export const Action = ({ children, style }) => {
  return (
    <Theme>
      <Styled.Action style={style}>{children}</Styled.Action>
    </Theme>
  );
};
