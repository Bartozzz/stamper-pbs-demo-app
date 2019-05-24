import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../constants/Colors";

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
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.checkbox, checked && styles.checkboxChecked]}
          onPress={this.toggle}
        >
          {checked && <Ionicons name="md-checkmark" size={14} color="white" />}
        </TouchableOpacity>

        {label}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    marginHorizontal: 0,
    marginVertical: 12,

    flexDirection: "row"
  },

  checkbox: {
    marginRight: 9,
    // Visual centering:
    paddingTop: 1,
    paddingLeft: 1,

    alignItems: "center",
    justifyContent: "center",

    width: 20,
    height: 20,
    borderRadius: 20,

    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: colors.inputBorder
  },
  checkboxChecked: {
    borderColor: colors.primary,
    backgroundColor: colors.primary
  },

  checkboxLabel: {
    marginRight: 2,

    fontSize: 11.5,
    color: colors.link
  }
});

export default Checkbox;
