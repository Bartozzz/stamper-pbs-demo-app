import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

function getColorForState(theme, error, focus) {
  if (error) {
    return theme.errorColor;
  } else if (focus) {
    return theme.focusColor;
  } else {
    return theme.idleColor;
  }
}

export const InputPadder = styled.View`
  margin-vertical: 15px;
`;

export const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 47px;
  width: 100%;

  border-radius: ${({ theme }) => theme.borderRadius};
  border-width: ${({ theme }) => theme.borderWidth};
  border-style: solid;
  border-color: ${(props) => {
    return getColorForState(props.theme, props.error, props.isFocused);
  }};
`;

export const InputError = styled.Text`
  position: absolute;
  top: 48px;

  color: ${({ theme }) => theme.errorColor};
  margin-horizontal: 17px;
  margin-top: 2px;

  font-size: 12px;
`;

export const InputIcon = styled(Ionicons)`
  padding-vertical: 10px;
  padding-horizontal: 20px;
  color: ${(props) => {
    return getColorForState(props.theme, props.error, props.isFocused);
  }};
`;

export const Input = styled.TextInput.attrs((props) => ({
  underlineColorAndroid: "transparent",
  autoCorrect: false,
  placeholderTextColor: getColorForState(
    props.theme,
    props.error,
    props.isFocused
  ),
}))`
  flex: 1;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 0px;

  font-size: 14px;
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.textColor};
`;
