import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import styled from "styled-components/native";

const InputPadder = styled.View`
  margin-vertical: 15px;
`;

const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 47px;
  width: 100%;

  border-radius: 100px;
  border-width: 1px;
  border-style: solid;
  border-color: ${colors.inputBorder};

  ${({ error }) =>
    error &&
    `
      border-color: ${colors.error};
    `};

  ${({ isFocused }) =>
    isFocused &&
    `
      border-color: ${colors.color};
    `}
`;

const InputError = styled.Text`
  position: absolute;
  top: 48px;

  color: ${colors.error};
  margin-horizontal: 17px;
  margin-top: 2px;

  font-size: 12px;
`;

const InputIcon = styled(Ionicons)`
  padding-vertical: 10px;
  padding-horizontal: 20px;
`;

const TextInput = styled.TextInput.attrs(props => ({
  underlineColorAndroid: "transparent",
  autoCorrect: false
}))`
  flex: 1;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 0px;

  font-size: 14px;
  font-family: ${layout.fontText};
  color: ${colors.color};
`;

class InputWithIcon extends Component {
  state = {
    isFocused: false
  };

  get inputColor() {
    if (this.error) {
      return colors.error;
    } else if (this.state.isFocused) {
      return colors.color;
    } else {
      return colors.inputBorder;
    }
  }

  get error() {
    const { error } = this.props;

    if (Array.isArray(error)) {
      if (error.length) {
        return error.join(". ") + ".";
      }
    } else if (error) {
      return error + ".";
    } else {
      return null;
    }
  }

  handleFocus = () => {
    this.setState({
      isFocused: true
    });
  };

  handleBlur = () => {
    this.setState({
      isFocused: false
    });
  };

  render() {
    const { iconName, iconSize, ...rest } = this.props;

    return (
      <InputPadder>
        <InputContainer
          style={this.inputStyle}
          error={this.error}
          isFocused={this.state.isFocused}
        >
          <InputIcon name={iconName} size={iconSize} color={this.inputColor} />

          <TextInput
            {...rest}
            placeholderTextColor={this.inputColor}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </InputContainer>

        {this.error && <InputError>{this.error}</InputError>}
      </InputPadder>
    );
  }
}

export default InputWithIcon;
