import React from "react";
import colors from "../../../constants/Colors";
import styled from "styled-components/native";

const CardPadder = styled.View`
  width: 50%;
  padding-vertical: 8px;
  padding-horizontal: 8px;
`;

const CardComponent = styled.View`
  background-color: ${colors.color};
  border-radius: 8px;
`;

const CardActionButton = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
`;

const CardSecondaryActionButton = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
`;

const CardImage = styled.Image`
  align-self: center;

  margin-top: 35px;
  margin-bottom: 20px;

  /* Make sure the image fits: */
  resize-mode: contain;

  width: 60px;
  height: 60px;
`;

const CardTitle = styled.Text`
  color: #001432;
  font-size: 14px;
  font-family: poppins-bold;
  text-align: center;
`;

const CardSubtitle = styled.Text`
  color: #709be7;
  font-size: 9px;
  font-family: nunito-regular;
  text-align: center;
`;

export function Card({ image, title, subtitle, ...props }) {
  return (
    <CardPadder>
      <CardComponent>
        <CardActionButton>
          {typeof props.renderPrimaryAction === "function"
            ? props.renderPrimaryAction()
            : null}
        </CardActionButton>

        <CardSecondaryActionButton>
          {typeof props.renderSecondaryAction === "function"
            ? props.renderSecondaryAction()
            : null}
        </CardSecondaryActionButton>

        <CardImage source={image} />

        <CardTitle>{title.toUpperCase()}</CardTitle>
        <CardSubtitle>{subtitle.toUpperCase()}</CardSubtitle>

        {typeof props.renderButton === "function" && props.renderButton()}
      </CardComponent>
    </CardPadder>
  );
}

export default Card;
