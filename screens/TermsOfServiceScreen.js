import React from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import HTML from "react-native-render-html";

import colors from "../constants/Colors";

class TermsOfServiceScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Regulamin"
  });

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <HTML
            html={`
<h1>Regulamin</h1>
          `}
            imagesMaxWidth={Dimensions.get("window").width}
          />
        </ScrollView>
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

export default TermsOfServiceScreen;
