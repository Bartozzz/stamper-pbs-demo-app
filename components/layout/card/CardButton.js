import React from "react";
import Button from "../../Button/index";
import styled from "styled-components/native";

const ButtonComponent = styled(Button)`
  padding: 4px;
  margin-horizontal: 4px;
  margin-bottom: 4px;
  margin-top: 10px;

  height: auto;
`;

export function CardButton({ style, textStyle, ...props }) {
  return (
    <ButtonComponent
      {...props}
      style={style}
      textStyle={[textStyle, { fontSize: 15 }]}
    />
  );
}

export default CardButton;
