import * as React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  FlatList,
  Text,
} from "react-native";

import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import layout from "../../constants/Layout";
import * as Routes from "../../navigation";

import HeaderHamburger from "../../components/HeaderHamburger";
import Button from "../../components/Button";
import Background from "../../components/Background";
import InputSearch from "../../components/InputSearch";
import PrizesHeader from "../../components/screens/prizes/Header";
import ExpirationDate from "../../components/helpers/ExpirationDate";
import FocusableCard from "../../components/FocusableCard";

import { getPrizes } from "../../store/reducers/prizes";

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
    headerRight: <HeaderHamburger navigation={navigation} />,
  });

  state = {
    selected: null,
    search: null,
  };

  async componentDidMount() {
    this.props.getPrizes();
    this.props.navigation.setParams({ handleSearch: this.handleSearch });
  }

  claimPrizeOnline = () => {
    this.props.navigation.navigate(Routes.PRIZES_SELECTED, {
      card: this.state.selected,
    });
  };

  claimPrizeOffline = () => {
    this.props.navigation.navigate(Routes.SCANNER);
  };

  selectPrize = (prize) => () => {
    this.setState({
      selected: prize,
    });
  };

  handleSearch = (searchTerm) => {
    this.setState({
      search: searchTerm,
    });
  };

  renderList() {
    const { selected, search } = this.state;
    const { prizes } = this.props;
    let data = prizes.filter((prize) => !prize.collected);

    // Filter data based on current search term:
    if (search) {
      data = data.filter(
        (prize) =>
          prize.title.toLowerCase().includes(search.toLowerCase()) ||
          prize.merchantName.toLowerCase().includes(search.toLowerCase())
      );
    }

    return (
      <FlatList
        data={data}
        extraData={selected}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          const isSelected = selected && selected.id === item.id;

          return (
            <FocusableCard
              key={item.id}
              focused={isSelected}
              onPress={this.selectPrize(item)}
            >
              <View style={defaultStyles.row}>
                <View
                  style={[
                    styles.imageContainer,
                    isSelected && styles.imageContainerSelected,
                  ]}
                >
                  <Image source={{ uri: item.iconUrl }} style={styles.image} />
                </View>

                <View style={[defaultStyles.row, { flex: 1, marginLeft: 15 }]}>
                  <View>
                    <Text
                      style={[
                        styles.textMerchant,
                        isSelected && styles.textMerchantSelected,
                      ]}
                    >
                      {item.merchantName}
                    </Text>

                    <Text
                      style={[
                        styles.textTitle,
                        isSelected && styles.textTitleSelected,
                      ]}
                    >
                      {item.title}
                    </Text>

                    <View style={styles.otherInformations}>
                      <Text
                        style={[
                          styles.textExpiry,
                          isSelected && styles.textExpirySelected,
                        ]}
                      >
                        {i18n.t("prizes.validTill", {
                          date: ExpirationDate({
                            isValid: item.validTo,
                            expirationDate: item.validToDate,
                          }),
                        })}
                      </Text>

                      <Text
                        style={[
                          styles.textCardNumber,
                          isSelected && styles.textCardNumberSelected,
                        ]}
                      >
                        NR {item.cardNumber}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </FocusableCard>
          );
        }}
      />
    );
  }

  render() {
    const { isLoading, navigation } = this.props;
    const { selected } = this.state;

    return (
      <Background source={BackgroundImage} disableScroll>
        <PrizesHeader
          title={i18n.t("navigation.prizes.list")}
          navigation={navigation}
          available
        />

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

        {selected && (
          <View style={styles.buttonContainer}>
            {selected.collectOffline && (
              <Button
                title={i18n.t("prizes.receiveOnPlace")}
                onPress={this.claimPrizeOffline}
                style={styles.button}
              />
            )}

            {selected.collectOnline && (
              <Button
                title={i18n.t("prizes.receiveOnline")}
                onPress={this.claimPrizeOnline}
                style={styles.button}
              />
            )}
          </View>
        )}
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 15,
    paddingBottom: 15,
  },

  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  button: {
    marginVertical: 5,
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
    borderRadius: 35,
  },
  imageContainerSelected: {
    borderColor: "#0046F5",
  },
  image: {
    width: 70,
    height: 70,
  },

  textMerchant: {
    marginTop: 5,

    fontSize: 14,
    fontFamily: layout.fontText,
    color: "#74798B",
    textTransform: "uppercase",
  },
  textMerchantSelected: {
    color: "#FFFFFF",
  },

  textTitle: {
    fontSize: 14,
    fontFamily: layout.fontText,
    color: "#74798B",
  },
  textTitleSelected: {
    color: "#95989A",
  },

  otherInformations: {
    marginTop: 5,

    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textExpiry: {
    width: "50%",

    fontSize: 9,
    color: "#74798B",
  },
  textExpirySelected: {
    color: "#74798B",
  },

  textCardNumber: {
    width: "50%",

    fontSize: 9,
    color: "#74798B",
    textAlign: "right",
  },
  textCardNumberSelected: {
    color: "#74798B",
  },
});

const mapStateToProps = (state) => ({
  isLoading: state.prizes.isLoading,
  prizes: state.prizes.prizes,
});

const mapDispatchToProps = {
  getPrizes,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrizesListScreen);
