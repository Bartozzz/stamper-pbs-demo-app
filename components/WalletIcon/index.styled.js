import styled from "styled-components/native";

export const IconContainer = styled.TouchableOpacity`
  margin-vertical: 10px;
  margin-horizontal: 13px;

  padding: 5px;

  border-radius: 20px;
  
  background-color: ${props => props.backgroundColor};
`;

export const IconImage = styled.Image`
  width: 14px;
  height: 14px;
`;