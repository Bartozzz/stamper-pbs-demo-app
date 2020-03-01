import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import colors from "../../constants/Colors";

const Container = styled.View`
  alignItems: center;

  marginHorizontal: 0;
  marginVertical: 12;

  flexDirection: row
`;
const CheckboxComponent = styled.TouchableOpacity`
  marginRight: 9;
  /* Visual centering: */
  paddingTop: 1;
  paddingLeft: 1;

  alignItems: center;
  justifyContent: center;

  width: 20;
  height: 20;
  borderRadius: 20;

  borderWidth: 1.5;
  borderStyle: solid;
  borderColor: ${colors.inputBorder};

  ${({ checked }) => checked && `
  borderColor: ${colors.primary};
  backgroundColor: ${colors.primary}
`}
`;

export const CheckBoxLabel = styled.Text`
  marginRight: 2;

  fontSize: 11.5;
  color: ${colors.link}
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
