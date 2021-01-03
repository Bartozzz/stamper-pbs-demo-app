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

export const InputLabel = styled.Text`
  padding-vertical: 10px;
  padding-right: 10px;

  color: ${({ theme }) => theme.labelColor};
  font-size: 10px;
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
  padding-vertical: 15px;
  padding-horizontal: 15px;

  font-size: 14px;
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.textColor};
`;
