import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView
} from "react-native";

import colors from "../../../constants/Colors";
import layout from "../../../constants/Layout";

export default function MapHeader(props) {
  return (
    <View>
      <ScrollView style={[styles.header, props.style]} horizontal>
        {props.filters.map((filter, index) => (
          <TouchableOpacity
            key={filter}
            style={styles.headerItem}
            onPress={() => props.onFilterSelect(filter, index)}
          >
            <Text
              style={[
                styles.headerItemText,
                index === props.filter && styles.headerItemTextActive
              ]}
            >
              {filter}
            </Text>

            <View
              style={[
                styles.headerItemBar,
                index === props.filter && styles.headerItemBarActive
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  header: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,

    backgroundColor: colors.background
  },
  headerItem: {
    marginRight: 30,

    // Centers item bar:
    alignItems: "center"
  },
  headerItemText: {
    fontFamily: layout.fontText,
    fontSize: 18,
    color: "#95989A"
  },
  headerItemTextActive: {
    color: colors.color
  },
  headerItemBar: {
    marginTop: 10,

    width: 40,
    height: 4,

    opacity: 0,
    borderRadius: 2,

    backgroundColor: colors.color
  },
  headerItemBarActive: {
    opacity: 1
  }
});
