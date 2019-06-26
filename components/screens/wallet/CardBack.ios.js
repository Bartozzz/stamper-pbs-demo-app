import * as React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

const DeleteImage = require("../../../assets/images/delete.png");

const height = 90;

export const CardBack = ({ data, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemRemove} onPress={onPress}>
      <Image source={DeleteImage} style={styles.itemRemoveImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 10,

    borderRadius: 10
  },
  itemRemove: {
    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    top: 10,
    right: -height,

    height: height,
    width: height,

    // backgroundColor: "#555f6f",
    backgroundColor: "#f16c41",
    borderRadius: 10,

    // Need to add zIndex to ensure that the TouchableOpacity will receive press
    // events on Android:
    zIndex: 1
  },
  itemRemoveImage: {
    width: 40,
    height: 40
  }
});

export default CardBack;
