import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import colors from "../../constants/Colors";

const Container = styled.View`
  align-items: center;

  margin-horizontal: 0px;
  margin-vertical: 12px;

  flex-direction: row;
`;
const CheckboxComponent = styled.TouchableOpacity`
  margin-right: 9px;
  /* Visual centering: */
  padding-top: 1px;
  padding-left: 1px;

  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;
  border-radius: 20px;

  border-width: 1.5px;
  border-style: solid;
  border-color: ${colors.inputBorder};

  ${({ checked }) => checked && `
    border-color: ${colors.primary};
    background-color: ${colors.primary};
  `};
`;

export const CheckBoxLabel = styled.Text`
  margin-right: 2px;

  font-size: 11.5px;
  color: ${colors.link};
`;

export class Checkbox extends React.PureComponent {
  state = {
    checked: false
  };

  componentDidMount() {
    this.setState({
      checked: this.props.checked
    });
  }

  toggle = () => {
    this.setState(
      state => ({ checked: !state.checked }),
      () => this.props.onChange(this.state.checked)
    );
  };

  render() {
    const { checked } = this.state;
    const { label } = this.props;

    return (
      <Container>
        <CheckboxComponent
          checked={checked}
          onPress={this.toggle}
        >
          {checked && <Ionicons name="md-checkmark" size={14} color="white" />}
        </CheckboxComponent>
        {label}
      </Container>
    );
  }
}


export default Checkbox;
