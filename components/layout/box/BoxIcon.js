import React from "react";
import styled from "styled-components/native";

const Icon = styled.Image`
  margin-bottom: 40px;
  width: ${props => props.width};
  height: ${props => props.height};
`;

export function BoxIcon({ source, width, height }) {
  return <Icon width={width} height={height} source={source} />;
}

export default BoxIcon;
