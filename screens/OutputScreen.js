import React from "react";
import {
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Platform
} from "react-native";

import Button from "../components/Button";
import Input from "../components/Input";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

const demoData = [
  {
    name: "FirstName",
    value: "FirstNameTest1"
  },
  {
    name: "LastName",
    value: "LastNameTest1"
  },
  {
    name: "FirstNameId",
    value: "132c3bfc67ef42b99aa046e7711d8091"
  },
  {
    name: "LastNameId",
    value: "7348e2e4aabe413c947658a9c0c9d493"
  },
  {
    name: "OrderId",
    value: "62ebfbf685b2482d86f73794e99e08ae"
  }
];

export default class OutputScreen extends React.Component {
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
          <FlatList
            data={demoData}
            renderItem={({ item }) => (
              <Text style={styles.flatListItem}>
                {item.name}
                {"\n"}
                {item.value}
              </Text>
            )}
          />
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            title="Scanner"
            onPress={() => this.props.navigation.navigate("Scanner")}
          />
        </View>
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
    paddingTop: 70,
    paddingHorizontal: 30
  },

  flatListItem: {
    color: colors.color,

    fontSize: 17,
    fontFamily: layout.fontText,

    paddingVertical: 18
  },

  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 30,

    ...Platform.select({
      ios: {
        marginBottom: 35
      },
      android: {
        marginBottom: 20
      }
    })
  }
});
