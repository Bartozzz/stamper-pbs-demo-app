import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import styled from "styled-components/native";

const InputPadder = styled.View`
  marginVertical: 15;
`;

const InputContainer = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: center;
  alignItems: center;

  height: 47;
  width: 100%;

  borderRadius: 100;
  borderWidth: 1;
  borderStyle: solid;
  borderColor: ${colors.inputBorder};
  
  ${({ error }) => error && `
    borderColor: ${colors.error}
  `};
  ${({ isFocused }) => isFocused && `
    borderColor: ${colors.color}
  `}
`;

const InputIcon = styled(Ionicons)`
  paddingVertical: 10;
  paddingHorizontal: 20
`;

const TextInput = styled.TextInput`
  flex: 1;
  paddingTop: 10;
  paddingRight: 10;
  paddingBottom: 10;
  paddingLeft: 0;

  fontSize: 14;
  fontFamily: ${layout.fontText};
  color: ${colors.color}
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
        <InputContainer style={this.inputStyle} error={this.error} isFocused={this.state.isFocused}>
          <InputIcon
            name={iconName}
            size={iconSize}
            color={this.inputColor}
          />

          <TextInput
            {...rest}
            placeholderTextColor={this.inputColor}
            underlineColorAndroid="transparent"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            autoCorrect={false}
          />
        </InputContainer>

        {this.error ? (
          <Error>{this.error}</Error>
        ) : null}
      </InputPadder>
    );
  }
}


export default InputWithIcon;
