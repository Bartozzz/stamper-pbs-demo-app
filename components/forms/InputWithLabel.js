import React, { Component } from "react";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import styled from "styled-components/native";

const InputPadder = styled.View`
  marginVertical: 15;
`;

const InputContainer = styled.View`
  flexDirection: row;
  justifyContent: center;
  alignItems: center;

  borderRadius: 8;
  borderWidth: 1.5;
  borderColor: ${colors.inputBorder}

  ${({ error }) => error && `
    borderColor: ${colors.error}
  `};
  ${({ isFocused }) => isFocused && `
    borderColor: ${colors.color}
  `}
`;

const InputLabel = styled.Text`
  paddingVertical: 10;
  paddingRight: 10;

  color: ${colors.info};
  fontSize: 10
`;

const TextInput = styled.TextInput`
  flex: 1;
  paddingVertical: 15;
  paddingHorizontal: 15;

  fontSize: 14;
  fontFamily: ${layout.fontText};
  color: ${colors.color}
`;

const Error = styled.Text`
  position: absolute;
  top: 54;

  color: ${colors.error};
  marginHorizontal: 12;
  marginTop: 2;

  fontSize: 12
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
        <InputContainer style={this.inputStyle} error={this.error} isFocused={this.state.isFocused}>
          <TextInput
            {...rest}
            placeholderTextColor={this.inputColor}
            underlineColorAndroid="transparent"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            autoCorrect={false}
          />

          <InputLabel>{label}</InputLabel>
        </InputContainer>

        {this.error ? (
          <Error>{this.error}</Error>
        ) : null}
      </InputPadder>
    );
  }
}

export default InputWithLabel;
