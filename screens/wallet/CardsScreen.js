import * as React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  View,
  ScrollView
} from "react-native";
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
import { getWallet } from "../../store/reducers/wallet";
import { formatDate } from "../../helpers/date";

const BackgroundImage = require("../../assets/backgrounds/wallet.png");

class WalletCardsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "",
    headerLeft: <InputSearch />,
    headerRight: <Hamburger navigation={navigation} />
  });

  componentDidMount() {
    this.props.getWallet();
  }

  renderCards() {
    const { cards, isLoading } = this.props;

    if (isLoading) {
      return <ActivityIndicator color={colors.primary} size="large" />;
    } else {
      return (
        <SwipeListView
          useFlatList
          data={cards}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={(data, rowMap) => (
            <View style={[styles.item, styles.itemFront]} key={data.item.id}>
              <View style={[defaultStyles.row, { flex: 1, marginBottom: 10 }]}>
                <Text style={styles.textId}>Nr. {data.item.cardNumber}</Text>

                <View style={{ marginTop: 6 }}>
                  <ProgressBar
                    progress={data.item.stampsToDate / data.item.stampsTotal}
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
                  source={{ uri: data.item.iconUrl }}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />

                <View style={[defaultStyles.row, { flex: 1, marginLeft: 10 }]}>
                  <View>
                    <Text style={styles.textTitle}>{data.item.title}</Text>
                    <Text style={styles.textExpiry}>
                      ważna do {formatDate(data.item.validToDate)}
                    </Text>
                  </View>

                  <Text style={styles.textAmount}>
                    {data.item.stampsToDate} / {data.item.stampsTotal}
                  </Text>
                </View>
              </View>
            </View>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View
              style={[styles.item, styles.itemBack]}
              key={`${data.item.id}_hidden`}
            >
              <Text>Left</Text>
              <Text>Right</Text>
            </View>
          )}
          disableRightSwipe={true}
          rightOpenValue={-75}
        />
      );
    }
  }

  render() {
    return (
      <Background source={BackgroundImage} disableScroll>
        <WalletHeader
          title={i18n.t("navigation.wallet.cards")}
          navigation={this.props.navigation}
          cards
        />

        <ScrollView style={styles.list}>{this.renderCards()}</ScrollView>
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
  isLoading: state.wallet.isLoading,
  cards: state.wallet.cards
});

const mapDispatchToProps = {
  // …
  getWallet
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletCardsScreen);
