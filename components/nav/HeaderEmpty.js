import React from "react";
import styled from "styled-components/native";

const Empty = styled.View`
  align-self: flex-start;

  width: 45px;
  height: 40px; 
`;
// React navigation throws errors if there's no function
function HeaderEmpty() {
  return <Empty></Empty>;
}

export default HeaderEmpty;
