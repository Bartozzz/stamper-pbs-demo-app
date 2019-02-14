import * as React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text } from "react-native";

class MapFavoritesScreen extends React.Component {
  renderData() {
    return null;
  }

  render() {
    return <View>{this.renderData()}</View>;
  }
}

const styles = StyleSheet.create({
  // …
});

const mapStateToProps = state => ({
  // …
});

const mapDispatchToProps = {
  // …
};

export default connect(mapStateToProps, mapDispatchToProps)(MapFavoritesScreen);
