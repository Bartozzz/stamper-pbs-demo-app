import React from "react";
import colors from "../../../constants/Colors";
import styled from "styled-components/native";

const CardPadder = styled.View`
  width: 50%;
  paddingVertical: 8;
  paddingHorizontal: 8
`;

const CardComponent = styled.View`
  backgroundColor: ${colors.color};
  borderRadius: 8
`;

const CardActionButton = styled.View`
  position: absolute;
  top: 0;
  left: 0
`;

const CardSecondaryActionButton = styled.View`
  position: absolute;
  top: 0;
  right: 0
`;

const CardImage = styled.Image`
  alignSelf: center;

  marginTop: 35;
  marginBottom: 20;

  /* Make sure the image fits: */
  resizeMode: contain;

  width: 60;
  height: 60
`;

const CardTitle = styled.Text`
  color: #001432;
  fontSize: 14;
  fontFamily: poppins-bold;
  textAlign: center
`;

const CardSubtitle = styled.Text`
  color: #709BE7;
  fontSize: 9;
  fontFamily: nunito-regular;
  textAlign: center
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

        {typeof props.renderButton === "function" ? props.renderButton() : null}
      </CardComponent>
    </CardPadder>
  );
}

export default Card;
