import React from "react";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

export const Component = ({ image, title, subtitle, ...props }) => {
  return (
    <Theme>
      <Styled.Padder>
        <Styled.Component>
          <Styled.ActionButton>
            {typeof props.renderPrimaryAction === "function" &&
              props.renderPrimaryAction()}
          </Styled.ActionButton>

          <Styled.SecondaryActionButton>
            {typeof props.renderSecondaryAction === "function" &&
              props.renderSecondaryAction()}
          </Styled.SecondaryActionButton>

          <Styled.Image source={image} />

          <Styled.Title testID="layout-card-title">
            {title.toUpperCase()}
          </Styled.Title>
          <Styled.Subtitle testID="layout-card-subtitle">
            {subtitle.toUpperCase()}
          </Styled.Subtitle>

          {typeof props.renderButton === "function" && props.renderButton()}
        </Styled.Component>
      </Styled.Padder>
    </Theme>
  );
};

export const Button = ({ style, textStyle, ...props }) => {
  return (
    <Styled.CardButton
      {...props}
      style={style}
      textStyle={[textStyle, { fontSize: 15 }]}
    />
  );
};
