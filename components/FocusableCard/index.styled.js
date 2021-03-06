import styled from "styled-components/native";

export const CardContainer = styled.TouchableOpacity`
  position: relative;

  padding: 10px;
  margin-horizontal: 15px;
  margin-vertical: 10px;

  border-width: ${({ theme }) => theme.borderWidth};
  border-radius: ${({ theme }) => theme.borderRadius};
  border-style: solid;
  border-color: ${(props) =>
    props.focused
      ? props.theme.focused.borderColor
      : props.theme.idle.borderColor};
  background-color: ${(props) =>
    props.focused
      ? props.theme.focused.backgroundColor
      : props.theme.idle.backgroundColor};
`;
