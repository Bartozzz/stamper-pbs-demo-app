import * as React from "react";
import { connect } from "react-redux";
import {
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
import InputSearch from "../../components/InputSearch";
import WalletHeader from "../../components/wallet/Header";
import { getWallet, removeCard } from "../../store/reducers/wallet";
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
    search: null
  };

  componentDidMount() {
    // As from specs (client e-mail):
    // "Po wczytaniu Portfel > Miejsca proszę wynik zapisać lokalnie oraz go
    // wyzerować po wejściu na ekran główny by przechodzenie pomiędzy widokiem
    // Portfel > Karty i spowrotem do Portfel > Miejsca  nie wymagały ponownego
    // wczytywania danych".
    this.props.getWallet();
    this.props.navigation.setParams({ handleSearch: this.handleSearch });
  }

  removeCard = cardId => () => {
    const card = this.props.cards.find(card => card.id === cardId);

    if (card && card.stampsToDate === 0) {
      this.props.removeCard(cardId);
    } else {
      this.errorToast.show(i18n.t("errors.wallet.emptyCard"));
    }
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
        renderItem={data => (
          <>
            <TouchableOpacity
              style={[styles.item, styles.itemFront]}
              key={data.item.id}
              onPress={() => this.navigateToCardInfo(data.item)}
            >
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
              style={[
                styles.itemRemove,
                data.item.stampsToDate > 0 && { backgroundColor: "#555f6f" }
              ]}
              onPress={this.removeCard(data.item.id)}
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

    return (
      <Background source={BackgroundImage} disableScroll>
        <WalletHeader
          title={i18n.t("navigation.wallet.cards")}
          navigation={navigation}
          cards
        />

        {isLoading ? (
          <View style={[defaultStyles.grow, defaultStyles.center]}>
            <Image source={WalletLoader} style={{ width: 150, height: 150 }} />
          </View>
        ) : (
          <ScrollView style={styles.list}>
            {this.renderCards()}
            <View style={{ height: 60 }} />
          </ScrollView>
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
    flex: 1,
    height: 90,

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

    backgroundColor: "#f16c41",
    borderRadius: 10
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
