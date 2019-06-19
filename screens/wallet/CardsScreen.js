import * as React from "react";
import { connect } from "react-redux";
import {
  AsyncStorage,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Toast from "react-native-easy-toast";
import { Bar as ProgressBar } from "react-native-progress";

import * as Routes from "../../navigation";
import HeaderHamburger from "../../components/nav/HeaderHamburger";
import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import Background from "../../components/Background";
import InputSearch from "../../components/forms/InputSearch";
import WalletHeader from "../../components/screens/wallet/Header";
import {
  WALLET_CARDS,
  FORCE_REFRESH_WALLET,
  getWallet,
  removeCard
} from "../../store/reducers/wallet";
import { formatDate } from "../../helpers/date";

const BackgroundImage = require("../../assets/backgrounds/wallet_wn.png");
const DeleteImage = require("../../assets/images/delete.png");
const WalletLoader = require("../../assets/loaders/wallet.gif");

const height = 90;
const margin = 15;

class WalletCardsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "",
    headerLeft: (
      <InputSearch
        onChangeText={
          navigation.state.params &&
          Reflect.has(navigation.state.params, "handleSearch")
            ? navigation.state.params.handleSearch
            : null
        }
      />
    ),
    headerRight: <HeaderHamburger navigation={navigation} />
  });

  state = {
    isCheckingIfCacheValid: false,
    search: null
  };

  async componentDidMount() {
    const { cards, getWallet } = this.props;

    // const shouldRefetchData = await AsyncStorage.getItem(FORCE_REFRESH_WALLET);
    // const shouldRefetchBool = JSON.parse(shouldRefetchData);
    // const hasCards = Array.isArray(cards) && cards.length > 0;
    //
    // if (shouldRefetchData === null || shouldRefetchBool === true || !hasCards) {
    //   this.setState({ isCheckingIfCacheValid: false });
    //   console.log("Refreshing wallet cards");
    //
    //   getWallet().then(data => {
    //     AsyncStorage.setItem(FORCE_REFRESH_WALLET, JSON.stringify(false));
    //     AsyncStorage.setItem(WALLET_CARDS, JSON.stringify(data.payload.data));
    //   });
    // } else {
    //   this.setState({ isCheckingIfCacheValid: false });
    // }

    getWallet();

    this.props.navigation.setParams({ handleSearch: this.handleSearch });
  }

  removeCard = cardId => {
    this.props.navigation.navigate(Routes.WALLET_CARD_REMOVAL_CONFIRMATION, {
      cardId: cardId
    });
  };

  handleSearch = search => {
    this.setState({ search });
  };

  navigateToCardInfo = card => {
    this.props.navigation.navigate(Routes.CARD_INFO, {
      merchant: "",
      cards: [card],
      backTo: Routes.WALLET_CARDS
    });
  };

  renderCards() {
    const { cards } = this.props;
    const { search } = this.state;
    let data = cards;

    // Filter data based on current search term:
    if (search) {
      data = data.filter(
        card =>
          card.id.toLowerCase().includes(search.toLowerCase()) ||
          card.cardNumber.toLowerCase().includes(search.toLowerCase()) ||
          card.title.toLowerCase().includes(search.toLowerCase()) ||
          card.merchantName.toLowerCase().includes(search.toLowerCase())
      );
    }

    return (
      <SwipeListView
        useFlatList
        data={data}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={(data, rowMap) => (
          <>
            <TouchableOpacity
              style={[styles.item, styles.itemFront]}
              key={data.item.id}
              onPress={() => this.navigateToCardInfo(data.item)}
            >
              <View style={[defaultStyles.row]}>
                <Text style={styles.textId}>{data.item.merchantName}</Text>

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

              <View style={[defaultStyles.row, { paddingTop: 10 }]}>
                <Image
                  source={{ uri: data.item.logoUrl }}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />

                <View style={[defaultStyles.row, { flex: 1, marginLeft: 10 }]}>
                  <View>
                    <Text style={styles.textTitle}>{data.item.title}</Text>
                    <Text style={styles.textExpiry}>
                      {i18n.t("prizes.validTill", {
                        date: formatDate(data.item.validToDate)
                      })}
                    </Text>
                  </View>

                  <Text style={styles.textAmount}>
                    {data.item.stampsToDate} / {data.item.stampsTotal}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.itemRemove}
              onPress={() => {
                rowMap[data.item.id].closeRow();
                this.removeCard(data.item.id);
              }}
            >
              <Image source={DeleteImage} style={styles.itemRemoveImage} />
            </TouchableOpacity>
          </>
        )}
        renderHiddenItem={() => <View />}
        disableRightSwipe={true}
        rightOpenValue={-(height + margin)}
      />
    );
  }

  render() {
    const { isLoading, navigation } = this.props;
    const { isCheckingIfCacheValid } = this.state;

    return (
      <Background source={BackgroundImage} disableScroll>
        <WalletHeader
          title={i18n.t("navigation.wallet.cards")}
          navigation={navigation}
          cards
        />

        {!isCheckingIfCacheValid && (
          <>
            {isLoading ? (
              <View style={[defaultStyles.grow, defaultStyles.center]}>
                <Image
                  source={WalletLoader}
                  style={{ width: 150, height: 150 }}
                />
              </View>
            ) : (
              <ScrollView style={styles.list}>
                {this.renderCards()}
                <View style={{ height: 60 }} />
              </ScrollView>
            )}
          </>
        )}

        <Toast ref={errorToast => (this.errorToast = errorToast)} />
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 8
  },

  item: {
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 10,

    borderRadius: 10
  },
  itemFront: {
    backgroundColor: "rgba(255, 255, 255, 0.1)"
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
  },

  textId: {
    flex: 1,

    fontSize: 14,
    fontFamily: "nunito-black",
    color: "#95989A"
  },
  textTitle: {
    marginTop: 2,
    marginBottom: 3,

    fontSize: 14,
    fontFamily: "poppins-bold",
    color: colors.color
  },
  textExpiry: {
    fontSize: 9,
    fontFamily: "nunito-regular",
    color: "#95989A"
  },
  textAmount: {
    flex: 1,
    marginTop: 5,

    textAlign: "right",
    fontSize: 12,
    fontFamily: "nunito-regular",
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
  getWallet,
  removeCard
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletCardsScreen);
