import React from "react";
import styled from "styled-components/native";

const Empty = styled.View`
  alignSelf: flex-start;

  width: 45;
  height: 40
`;

export function HeaderEmpty() {
  return <Empty></Empty>;
}

export default HeaderEmpty;
