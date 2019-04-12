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
import defaultStyles from "../../constants/Styles";
import layout from "../../constants/Layout";
import * as Routes from "../../navigation";
import Header from "../../components/nav/Header";
import HeaderHamburger from "../../components/nav/HeaderHamburger";
import Button from "../../components/Button";
import Background from "../../components/Background";
import InputSearch from "../../components/InputSearch";
import {
  PRIZES_CARDS,
  FORCE_REFRESH_PRIZES,
  getPrizes
} from "../../store/reducers/prizes";
import { formatDate } from "../../helpers/date";

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
    selected: null,
    search: null
  };

  async componentDidMount() {
    const shouldRefetch = await AsyncStorage.getItem(FORCE_REFRESH_PRIZES);

    if (shouldRefetch === null || JSON.parse(shouldRefetch) === true) {
      console.log("Refreshing prizes cards");

      this.props.getPrizes().then(data => {
        console.log(data.payload.data);
        AsyncStorage.setItem(FORCE_REFRESH_PRIZES, JSON.stringify(false));
        AsyncStorage.setItem(PRIZES_CARDS, JSON.stringify(data.payload.data));
      });
    }

    this.props.navigation.setParams({ handleSearch: this.handleSearch });
  }

  claimPrize = () => {
    this.props.navigation.navigate(Routes.SCANNER, {
      type: Routes.PRIZES
    });
  };

  selectPrize = prizeId => () => {
    this.setState({
      selected: prizeId
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
    let data = prizes;

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
          const isSelected = selected === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.item, isSelected && styles.itemSelected]}
              onPress={this.selectPrize(item.id)}
            >
              <View style={defaultStyles.row}>
                <View
                  style={[
                    styles.imageContainer,
                    isSelected && styles.imageContainerSelected
                  ]}
                >
                  <Image source={{ uri: item.iconUrl }} style={styles.image} />
                </View>

                <View style={[defaultStyles.row, { flex: 1, marginLeft: 15 }]}>
                  <View>
                    <Text
                      style={[
                        styles.textMerchant,
                        isSelected && styles.textMerchantSelected
                      ]}
                    >
                      {item.merchantName}
                    </Text>

                    <Text
                      style={[
                        styles.textTitle,
                        isSelected && styles.textTitleSelected
                      ]}
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={[
                        styles.textExpiry,
                        isSelected && styles.textExpirySelected
                      ]}
                    >
                      {i18n.t("prizes.validTill", {
                        date: formatDate(item.validToDate)
                      })}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  render() {
    const { isLoading } = this.props;
    const { selected } = this.state;

    return (
      <Background source={BackgroundImage} disableScroll>
        <Header title={i18n.t("navigation.prizes.list")} />

        {isLoading ? (
          <View style={[defaultStyles.grow, defaultStyles.center]}>
            <Image source={RewardsLoader} style={{ width: 150, height: 150 }} />
          </View>
        ) : (
          <ScrollView style={styles.list}>
            {this.renderList()}
            <View style={{ height: 60 }} />
          </ScrollView>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title={i18n.t("prizes.receive")}
            onPress={this.claimPrize}
            disabled={selected === null}
          />
        </View>
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

  imageContainer: {
    width: 70,
    height: 70,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#001432",
    borderColor: "#709BE7",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 35
  },
  imageContainerSelected: {
    borderColor: "#0046F5"
  },
  image: {
    width: 70,
    height: 70
  },

  item: {
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
    backgroundColor: "#001333"
  },

  textMerchant: {
    marginTop: 5,

    fontSize: 14,
    fontFamily: layout.fontText,
    color: "#74798B",
    textTransform: "uppercase"
  },
  textMerchantSelected: {
    color: "#FFFFFF"
  },

  textTitle: {
    fontSize: 14,
    fontFamily: layout.fontText,
    color: "#74798B"
  },
  textTitleSelected: {
    color: "#95989A"
  },

  textExpiry: {
    marginTop: 11,

    fontSize: 9,
    color: "#74798B"
  },
  textExpirySelected: {
    color: "#74798B"
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
