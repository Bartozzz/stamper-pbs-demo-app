import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "../components/Button";
import Input from "../components/Input";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

export default class UrlScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>QR Code{"\n"}tester</Text>
          </View>

          <View style={styles.inputContainer}>
            <Input value="URL" />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Save"
              onPress={() => this.props.navigation.navigate("Scanner")}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  contentContainer: {
    paddingTop: 30
  },

  titleContainer: {
    alignItems: "center",
    marginTop: 70,
    marginBottom: 40
  },
  titleText: {
    fontFamily: layout.fontHead,
    fontSize: 40,
    color: colors.color,
    textTransform: "uppercase",
    textAlign: "center"
  },

  inputContainer: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 60,
    marginHorizontal: 30
  },

  buttonContainer: {
    alignItems: "center",
    marginHorizontal: 30
  }
});
