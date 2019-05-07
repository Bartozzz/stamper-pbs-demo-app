import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../constants/Colors";

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
    const { onChange } = this.props;

    this.setState(
      state => ({
        checked: !state.checked
      }),
      () => {
        onChange(this.state.checked);
      }
    );
  };

  render() {
    const { checked } = this.state;
    const { label } = this.props;

    return (
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[
            styles.checkboxButton,
            checked && styles.checkboxButtonChecked
          ]}
          onPress={this.toggle}
        >
          {checked && <Ionicons name="md-checkmark" size={12} color="white" />}
        </TouchableOpacity>

        {label}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  checkboxContainer: {
    marginHorizontal: 0,
    marginVertical: 12,

    flexDirection: "row"
  },

  checkboxButton: {
    alignItems: "center",
    justifyContent: "center",

    width: 18,
    height: 18,
    borderRadius: 18,

    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: colors.inputBorder
  },
  checkboxButtonChecked: {
    borderColor: colors.primary,
    backgroundColor: colors.primary
  },

  checkboxLabel: {
    marginLeft: 12,

    fontSize: 12.5,
    color: "#709BE7"
  }
});

export default Checkbox;
