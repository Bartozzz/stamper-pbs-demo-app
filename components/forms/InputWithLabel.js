import React, { Component } from "react";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import styled from "styled-components/native";

const InputPadder = styled.View`
  margin-vertical: 15px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  border-width: 1.5px;
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
    `};
`;

const InputLabel = styled.Text`
  padding-vertical: 10px;
  padding-right: 10px;

  color: ${colors.info};
  font-size: 10px;
`;

const TextInput = styled.TextInput.attrs(props => ({
  underlineColorAndroid: "transparent",
  autoCorrect: false
}))`
  flex: 1;
  padding-vertical: 15px;
  padding-horizontal: 15px;

  font-size: 14px;
  font-family: ${layout.fontText};
  color: ${colors.color};
`;

const InputError = styled.Text`
  position: absolute;
  top: 54px;

  color: ${colors.error};
  margin-horizontal: 12px;
  margin-top: 2px;

  font-size: 12px;
`;

class InputWithLabel extends Component {
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
    const { label, ...rest } = this.props;

    return (
      <InputPadder>
        <InputContainer
          style={this.inputStyle}
          error={this.error}
          isFocused={this.state.isFocused}
        >
          <TextInput
            {...rest}
            placeholderTextColor={this.inputColor}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />

          <InputLabel>{label}</InputLabel>
        </InputContainer>

        {this.error ? <InputError>{this.error}</InputError> : null}
      </InputPadder>
    );
  }
}

export default InputWithLabel;
