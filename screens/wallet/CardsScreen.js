import * as React from "react";
import { connect } from "react-redux";
import { StyleSheet, Image, Text, View, ScrollView } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Bar as ProgressBar } from "react-native-progress";

import * as Routes from "../../navigation";
import Hamburger from "../../components/Hamburger";
import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import Background from "../../components/Background";
import InputSearch from "../../components/InputSearch";
import WalletHeader from "../../components/wallet/Header";

const BackgroundImage = require("../../assets/backgrounds/wallet.png");

const data = [
  { id: 1, title: "Darmowa kawa", image: null, expiry: +new Date() },
  { id: 2, title: "Darmowa kawa", image: null, expiry: +new Date() },
  { id: 3, title: "Darmowa kawa", image: null, expiry: +new Date() },
  { id: 4, title: "Darmowa kawa", image: null, expiry: +new Date() },
  { id: 5, title: "Darmowa kawa", image: null, expiry: +new Date() },
  { id: 6, title: "Darmowa kawa", image: null, expiry: +new Date() },
  { id: 7, title: "Darmowa kawa", image: null, expiry: +new Date() }
];

class WalletCardsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "",
    headerLeft: <InputSearch />,
    headerRight: <Hamburger navigation={navigation} />
  });

  render() {
    const { navigation } = this.props;

    return (
      <Background source={BackgroundImage} disableScroll>
        <WalletHeader
          title={i18n.t("navigation.wallet.cards")}
          navigation={navigation}
          cards
        />

        <ScrollView style={styles.list}>
          <SwipeListView
            useFlatList
            data={data}
            renderItem={(data, rowMap) => (
              <View style={[styles.item, styles.itemFront]}>
                <View
                  style={[defaultStyles.row, { flex: 1, marginBottom: 10 }]}
                >
                  <Text style={styles.textId}>Nr. 123</Text>

                  <View style={{ marginTop: 6 }}>
                    <ProgressBar
                      progress={0.3}
                      borderRadius={0}
                      height={6}
                      width={140}
                      color="#0046F5"
                      unfilledColor="#001432"
                      borderWidth={0}
                    />
                  </View>
                </View>

                <View style={defaultStyles.row}>
                  <Image
                    source={{
                      uri:
                        "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png"
                    }}
                    style={{ width: 40, height: 40 }}
                  />

                  <View
                    style={[defaultStyles.row, { flex: 1, marginLeft: 10 }]}
                  >
                    <View>
                      <Text style={styles.textTitle}>Darmowa kawa</Text>
                      <Text style={styles.textExpiry}>ważna do 11/12/2015</Text>
                    </View>

                    <Text style={styles.textAmount}>2/10</Text>
                  </View>
                </View>
              </View>
            )}
            renderHiddenItem={(data, rowMap) => (
              <View style={[styles.item, styles.itemBack]}>
                <Text>Left</Text>
                <Text>Right</Text>
              </View>
            )}
            disableRightSwipe={true}
            rightOpenValue={-75}
          />
        </ScrollView>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 15
  },

  item: {
    flex: 1,
    height: 90,

    padding: 10,
    marginHorizontal: 15,
    marginVertical: 10,

    borderRadius: 10
  },
  itemFront: {
    backgroundColor: "#203451"
  },
  itemBack: {
    backgroundColor: "#f16c41"
  },

  textId: {
    flex: 1,

    fontSize: 14,
    fontFamily: layout.fontHead,
    color: "#95989A"
  },
  textTitle: {
    marginTop: 2,
    marginBottom: 3,

    fontSize: 14,
    fontFamily: layout.fontHead,
    color: colors.color
  },
  textExpiry: {
    fontSize: 9,
    color: "#95989A"
  },
  textAmount: {
    flex: 1,
    marginTop: 5,

    textAlign: "right",
    fontSize: 12,
    color: "#95989A"
  }
});

const mapStateToProps = state => ({
  // …
});

const mapDispatchToProps = {
  // …
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletCardsScreen);
