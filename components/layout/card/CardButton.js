import React from "react";
import Button from "../../forms/Button";
import styled from "styled-components/native";

const ButtonComponent = styled(Button)`
  padding: 4px;
  marginHorizontal: 4;
  marginBottom: 4;
  marginTop: 10;

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
