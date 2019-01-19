import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../../constants/Colors";

class MenuScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Test</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});

export default MenuScreen;
