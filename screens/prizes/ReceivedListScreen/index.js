import * as React from "react";
import { connect } from "react-redux";
import { Image, View } from "react-native";

import i18n from "../../../translations";
import defaultStyles from "../../../constants/Styles";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

import HeaderHamburger from "../../../components/HeaderHamburger";
import Background from "../../../components/Background";
import InputSearch from "../../../components/InputSearch";
import PrizesHeader from "../../../components/screens/prizes/Header";
import ExpirationDate from "../../../components/helpers/ExpirationDate";
import SelectableCard from "../../../components/SelectableCard";

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
    search: null,
    internet: false,
  };

  async componentDidMount() {
    if (this.props.navigation.getParam("internet") === true) {
      this.props.getPrizes();
      this.setState({ internet: true });
    }
    this.props.navigation.setParams({ handleSearch: this.handleSearch });
  }

  handleSearch = (searchTerm) => {
    this.setState({
      search: searchTerm,
    });
  };

  renderList() {
    const { search } = this.state;
    const { prizes } = this.props;
    let data = prizes.filter((prize) => prize.collected);

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
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 60 }}
          renderItem={({ item }) => (
            <SelectableCard
              selectable={item.collectOnline}
              key={item.id}
              renderFront={() => (
                <>
                  <Styled.ItemOkIcon source={images.Ok} />

                  <View style={defaultStyles.row}>
                    <Styled.ImageContainer>
                      <Styled.Image source={{ uri: item.iconUrl }} />
                    </Styled.ImageContainer>

                    <View
                      style={[defaultStyles.row, { flex: 1, marginLeft: 15 }]}
                    >
                      <View>
                        <Styled.Merchant>{item.merchantName}</Styled.Merchant>

                        <Styled.Title>{item.title}</Styled.Title>

                        <Styled.Expiry>
                          {i18n.t("prizes.validTill", {
                            date: ExpirationDate({
                              isValid: item.validTo,
                              expirationDate: item.validToDate,
                            }),
                          })}
                        </Styled.Expiry>
                      </View>
                    </View>
                  </View>
                </>
              )}
              renderBack={() => (
                <View style={defaultStyles.row}>
                  <Styled.ImageContainer>
                    <Styled.Image
                      source={{
                        uri: item.collectOnlineLogoUrl || item.iconUrl,
                      }}
                    />
                  </Styled.ImageContainer>

                  <View
                    style={[defaultStyles.row, { flex: 1, marginLeft: 15 }]}
                  >
                    <View>
                      <Styled.CodeTitle>
                        {i18n.t("prizes.code")}:
                      </Styled.CodeTitle>

                      <Styled.CardNumber>
                        {item.collectOnlineCode}
                      </Styled.CardNumber>

                      <Styled.TextGenerationDate>
                        {i18n.t("prizes.generatedOn", {
                          date: ExpirationDate({
                            isValid: true,
                            expirationDate: item.collectedDate,
                          }),
                        })}
                      </Styled.TextGenerationDate>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        />
      </Theme>
    );
  }

  render() {
    const { isLoading, navigation } = this.props;
    const { internet } = this.state;

    return (
      <Background source={images.BackgroundPrizesWn} disableScroll>
        <PrizesHeader
          title={i18n.t("navigation.prizes.list")}
          navigation={navigation}
          internet={internet}
          received
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
      </Background>
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
