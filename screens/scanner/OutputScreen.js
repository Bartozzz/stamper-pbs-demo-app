import React from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Platform
} from "react-native";

import { getData } from "../../store/reducers/qrdata";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Error from "../../components/Error";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

class OutputScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    const { url, qrc, getData } = this.props;

    if (url && qrc) {
      getData(`${url}${qrc}`);
    }
  }

  renderData = () => {
    return (
      <FlatList
        data={this.props.data}
        renderItem={({ item }) => (
          <Text style={styles.flatListItem}>
            {item.name}
            {"\n"}
            {item.value}
          </Text>
        )}
      />
    );
  };

  renderError = () => {
    return <Error message={this.props.error} />;
  };

  renderEmpty = () => {
    return (
      <Text style={styles.flatListItem}>
        There's not data to fetch. Make sure you've scanned a correct QR Code
        and wrote a correct URL.
      </Text>
    );
  };

  renderLoading = () => {
    return <Text style={styles.loading}>Loading data…</Text>;
  };

  renderContent = () => {
    const { error, loading, data } = this.props;

    if (loading) {
      return this.renderLoading();
    }

    if (error) {
      return this.renderError();
    }

    if (!data || data.length === 0) {
      return this.renderEmpty();
    }

    return this.renderData();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {this.renderContent()}
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

  loading: {
    color: colors.color,

    fontSize: 20,
    fontFamily: layout.fontText,
    textAlign: "center"
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

const mapStateToProps = state => ({
  // …
  loading: state.qrdata.fetchingData,
  error: state.qrdata.error,
  data: state.qrdata.data,
  url: state.qrdata.url,
  qrc: state.qrdata.qrc
});

const mapDispatchToProps = {
  // …
  getData
};

export default connect(mapStateToProps, mapDispatchToProps)(OutputScreen);
