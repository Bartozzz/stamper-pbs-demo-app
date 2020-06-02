import styled from "styled-components/native";
import colors from "../../../../constants/Colors";

export const Container = styled.View`
  flex-direction: column;
  align-self: flex-start;
`;

export const Bubble = styled.View`
  flex: 0;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  justify-content: center;

  min-width: 40px;
  min-height: 40px;

  border-radius: 20px;
  border-width: 1px;
  border-color: ${colors.primary};

  background-color: ${colors.primary};

  z-index: 2;
`;

export const Count = styled.Text`
  color: #fff;
  font-size: 13px;
  font-weight: bold;
`;
