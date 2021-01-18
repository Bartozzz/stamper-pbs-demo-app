import * as React from "react";
import { connect } from "react-redux";
import { Image, View } from "react-native";

import i18n from "../../../translations";
import defaultStyles from "../../../constants/Styles";
import * as Routes from "../../../navigation";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

import HeaderHamburger from "../../../components/HeaderHamburger";
import Background from "../../../components/Background";
import InputSearch from "../../../components/InputSearch";
import PrizesHeader from "../../../components/screens/prizes/Header";
import ExpirationDate from "../../../components/helpers/ExpirationDate";
import FocusableCard from "../../../components/FocusableCard";

import { getPrizes } from "../../../store/reducers/prizes";

import images from "../../../constants/images";

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
    internet: false,
  };

  async componentDidMount() {
    if (this.props.navigation.state.params.internet === true) {
      this.props.getPrizes();
      this.setState({ internet: true });
    }
    this.props.navigation.setParams({ handleSearch: this.handleSearch });
  }

  claimPrizeOnline = () => {
    this.props.navigation.navigate(Routes.PRIZES_SELECTED, {
      card: this.state.selected,
    });
  };

  claimPrizeOffline = (walletCardId) => {
    this.props.navigation.navigate(Routes.SCANNER, {
      walletCardId: walletCardId,
    });
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
      <Theme>
        <Styled.List
          data={data}
          extraData={selected}
          keyExtractor={(item) => {
            return item.id;
          }}
          contentContainerStyle={{ paddingBottom: 60 }}
          renderItem={({ item }) => {
            const isSelected = selected && selected.id === item.id;

            return (
              <FocusableCard
                key={item.id}
                focused={isSelected}
                onPress={this.selectPrize(item)}
              >
                <View style={defaultStyles.row}>
                  <Styled.ImageContainer selected={isSelected}>
                    <Styled.Image source={{ uri: item.iconUrl }} />
                  </Styled.ImageContainer>

                  <View
                    style={[defaultStyles.row, { flex: 1, marginLeft: 15 }]}
                  >
                    <View>
                      <Styled.Merchant selected={isSelected}>
                        {item.merchantName}
                      </Styled.Merchant>

                      <Styled.Title selected={isSelected}>
                        {item.title}
                      </Styled.Title>

                      <Styled.OtherInformations>
                        <Styled.Expiry selected={isSelected}>
                          {i18n.t("prizes.validTill", {
                            date: ExpirationDate({
                              isValid: item.validTo,
                              expirationDate: item.validToDate,
                            }),
                          })}
                        </Styled.Expiry>

                        <Styled.CardNumber selected={isSelected}>
                          NR {item.cardNumber}
                        </Styled.CardNumber>
                      </Styled.OtherInformations>
                    </View>
                  </View>
                </View>
              </FocusableCard>
            );
          }}
        />
      </Theme>
    );
  }

  render() {
    const { isLoading, navigation } = this.props;
    const { selected, internet } = this.state;
    return (
      <Theme>
        <Background source={images.BackgroundPrizesWn} disableScroll>
          <PrizesHeader
            title={i18n.t("navigation.prizes.list")}
            navigation={navigation}
            internet={internet}
            available
          />

          {isLoading ? (
            <View style={[defaultStyles.grow, defaultStyles.center]}>
              <Image
                source={images.RewardsLoader}
                style={{ width: 150, height: 150 }}
              />
            </View>
          ) : (
            this.renderList()
          )}

          {selected && (
            <Styled.ButtonContainer>
              {selected.collectOffline && (
                <Styled.ButtonMargin
                  title={i18n.t("prizes.receiveOnPlace")}
                  onPress={() => this.claimPrizeOffline(this.state.selected.id)}
                  disabled={!internet}
                />
              )}

              {selected.collectOnline && (
                <Styled.ButtonMargin
                  title={i18n.t("prizes.receiveOnline")}
                  onPress={this.claimPrizeOnline}
                  disabled={!internet}
                />
              )}
            </Styled.ButtonContainer>
          )}
        </Background>
      </Theme>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.prizes.isLoading,
  prizes: state.prizes.prizes,
});

const mapDispatchToProps = {
  getPrizes,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrizesListScreen);
