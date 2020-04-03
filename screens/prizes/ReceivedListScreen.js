import * as React from "react";
import { connect } from "react-redux";
import {
  AsyncStorage,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Text
} from "react-native";

import i18n from "../../translations";
import colors from "../../constants/Colors";
import defaultStyles from "../../constants/Styles";
import layout from "../../constants/Layout";
import * as Routes from "../../navigation";
import Header from "../../components/nav/Header";
import HeaderHamburger from "../../components/nav/HeaderHamburger";
import Button from "../../components/forms/Button";
import Background from "../../components/Background";
import InputSearch from "../../components/forms/InputSearch";
import {
  PRIZES_CARDS,
  FORCE_REFRESH_PRIZES,
  getPrizes
} from "../../store/reducers/prizes";
import PrizesHeader from "../../components/screens/prizes/Header";
import ExpirationDate from "../../components/helpers/ExpirationDate";

const OkIconImage = require("../../assets/images/icons/ok.png");
const BackgroundImage = require("../../assets/backgrounds/prizes_wn.png");
const RewardsLoader = require("../../assets/loaders/rewards.gif");

class PrizesListScreen extends React.Component {
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
    selected: null,
    search: null
  };

  async componentDidMount() {
    // const shouldRefetchData = await AsyncStorage.getItem(FORCE_REFRESH_PRIZES);
    // const shouldRefetchBool = JSON.parse(shouldRefetchData);
    // const hasCards = Array.isArray(prizes) && prizes.length > 0;
    //
    // if (shouldRefetchData === null || shouldRefetchBool === true || !hasCards) {
    //   this.setState({ isCheckingIfCacheValid: false });
    //   console.log("Refreshing prizes cards");
    //
    //   getPrizes().then(data => {
    //     AsyncStorage.setItem(FORCE_REFRESH_PRIZES, JSON.stringify(false));
    //     AsyncStorage.setItem(PRIZES_CARDS, JSON.stringify(data.payload.data));
    //   });
    // } else {
    //   this.setState({ isCheckingIfCacheValid: false });
    // }

    this.props.getPrizes();
    this.props.navigation.setParams({ handleSearch: this.handleSearch });
  }

  selectPrize = prize => () => {
    this.setState({
      selected: prize
    });
  };

  handleSearch = searchTerm => {
    this.setState({
      search: searchTerm
    });
  };

  renderList() {
    const { selected, search } = this.state;
    const { prizes } = this.props;
    let data = prizes.filter(prize => prize.collected);

    // Filter data based on current search term:
    if (search) {
      data = data.filter(
        prize =>
          prize.title.toLowerCase().includes(search.toLowerCase()) ||
          prize.merchantName.toLowerCase().includes(search.toLowerCase())
      );
    }

    return (
      <FlatList
        data={data}
        extraData={selected}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={({ item }) => {
          const isSelected = selected && selected.id === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.item, isSelected && styles.itemSelected]}
              onPress={isSelected ? this.selectPrize() : this.selectPrize(item)}
            >
              {isSelected ? (
                <View style={defaultStyles.row}>
                  <View style={[styles.imageContainer]}>
                    <Image
                      source={{
                        uri: item.collectOnlineLogoUrl || item.iconUrl
                      }}
                      style={styles.image}
                    />
                  </View>

                  <View
                    style={[defaultStyles.row, { flex: 1, marginLeft: 15 }]}
                  >
                    <View>
                      <Text style={[styles.textCodeTitle]}>
                        {i18n.t("prizes.code")}:
                      </Text>

                      <Text style={[styles.textCodeNumber]}>
                        {item.collectOnlineCode}
                      </Text>

                      <Text style={[styles.textGenerationDate]}>
                        {i18n.t("prizes.generatedOn", {
                          date: ExpirationDate({
                            isValid: true,
                            expirationDate: item.collectedDate
                          })
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <>
                  <Image source={OkIconImage} style={styles.itemOkIcon} />

                  <View style={defaultStyles.row}>
                    <View
                      style={[
                        styles.imageContainer,
                        styles.imageContainerBorder
                      ]}
                    >
                      <Image
                        source={{ uri: item.iconUrl }}
                        style={styles.image}
                      />
                    </View>

                    <View
                      style={[defaultStyles.row, { flex: 1, marginLeft: 15 }]}
                    >
                      <View>
                        <Text style={[styles.textMerchant]}>
                          {item.merchantName}
                        </Text>

                        <Text style={[styles.textTitle]}>{item.title}</Text>

                        <Text style={[styles.textExpiry]}>
                          {i18n.t("prizes.validTill", {
                            date: ExpirationDate({
                              isValid: item.validTo,
                              expirationDate: item.validToDate
                            })
                          })}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              )}
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  render() {
    const { isLoading, navigation } = this.props;
    const { isCheckingIfCacheValid } = this.state;

    return (
      <Background source={BackgroundImage} disableScroll>
        <PrizesHeader
          title={i18n.t("navigation.prizes.list")}
          navigation={navigation}
          received
        />

        {!isCheckingIfCacheValid ? (
          <>
            {isLoading ? (
              <View style={[defaultStyles.grow, defaultStyles.center]}>
                <Image
                  source={RewardsLoader}
                  style={{ width: 150, height: 150 }}
                />
              </View>
            ) : (
              <ScrollView style={styles.list}>
                {this.renderList()}
                <View style={{ height: 60 }} />
              </ScrollView>
            )}
          </>
        ) : (
          <View style={[defaultStyles.grow]} />
        )}
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  // …
  list: {
    paddingTop: 15,
    paddingBottom: 15
  },

  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 24
  },
  button: {
    marginVertical: 5
  },

  imageContainer: {
    width: 70,
    height: 70,

    alignItems: "center",
    justifyContent: "center"
  },
  imageContainerBorder: {
    backgroundColor: "#001432",
    borderColor: "#709BE7",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 35
  },
  image: {
    resizeMode: "contain",

    width: 70,
    height: 70
  },

  item: {
    position: "relative",

    flex: 1,
    height: 90,

    padding: 10,
    marginHorizontal: 15,
    marginVertical: 10,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#203451",
    borderRadius: 10,
    backgroundColor: "#203451"
  },
  itemSelected: {
    borderColor: "#0046F5",
    backgroundColor: "#ffffff"
  },
  itemOkIcon: {
    position: "absolute",
    top: 28,
    right: 25,

    width: 32,
    height: 32
  },

  textMerchant: {
    marginTop: 5,

    fontSize: 14,
    fontFamily: layout.fontText,
    color: "#74798B",
    textTransform: "uppercase"
  },

  textTitle: {
    fontSize: 14,
    fontFamily: layout.fontText,
    color: "#74798B"
  },

  textExpiry: {
    marginTop: 11,

    fontSize: 9,
    color: "#74798B"
  },

  textCodeTitle: {
    fontSize: 16,
    fontFamily: layout.fontText,
    color: colors.primary
  },

  textCodeNumber: {
    marginTop: 4,
    fontSize: 16,
    fontFamily: layout.fontText
  },

  textGenerationDate: {
    marginTop: 5,
    fontSize: 9,
    fontFamily: layout.fontText
  }
});

const mapStateToProps = state => ({
  // …
  isLoading: state.prizes.isLoading,
  prizes: state.prizes.prizes
});

const mapDispatchToProps = {
  // …
  getPrizes
};

export default connect(mapStateToProps, mapDispatchToProps)(PrizesListScreen);
