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

import * as Routes from "../../navigation";
import { getData } from "../../store/reducers/qrdata";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Error from "../../components/Error";

import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

class ScannerOutputScreen extends React.Component {
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
      <Text style={styles.flatListItem}>{i18n.t("scanner.output.empty")}</Text>
    );
  };

  renderLoading = () => {
    return <Text style={styles.loading}>{i18n.t("loading")}</Text>;
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
      <View style={defaultStyles.container}>
        <ScrollView
          style={defaultStyles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {this.renderContent()}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            title={i18n.t("scanner.output.scanner")}
            onPress={() => this.props.navigation.navigate(Routes.SCANNER_SCAN)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(
  ScannerOutputScreen
);
