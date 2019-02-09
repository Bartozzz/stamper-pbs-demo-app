import * as React from "react";
import { connect } from "react-redux";
import {
  ActivityIndicator,
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
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import Header from "../../components/Header";
import Hamburger from "../../components/Hamburger";
import Button from "../../components/Button";
import Background from "../../components/Background";
import InputSearch from "../../components/InputSearch";
import { getPrizes } from "../../store/reducers/prizes";
import { formatDate } from "../../helpers/date";

const BackgroundImage = require("../../assets/backgrounds/prizes.png");

class PrizesListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "",
    headerLeft: <InputSearch />,
    headerRight: <Hamburger navigation={navigation} />
  });

  state = {
    selected: null
  };

  componentDidMount() {
    this.props.getPrizes();
  }

  claimPrize = () => {};

  selectPrize = prizeId => () => {
    this.setState({
      selected: prizeId
    });
  };

  renderList() {
    const { prizes, isLoading } = this.props;
    const { selected } = this.state;

    if (isLoading) {
      return <ActivityIndicator color={colors.primary} size="large" />;
    } else {
      return (
        <FlatList
          data={prizes}
          extraData={selected}
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
                    <Image
                      source={{ uri: item.iconUrl }}
                      style={styles.image}
                    />
                  </View>

                  <View
                    style={[defaultStyles.row, { flex: 1, marginLeft: 15 }]}
                  >
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
                        ważna do {formatDate(item.validToDate)}
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
  }

  render() {
    const { selected } = this.state;

    return (
      <Background source={BackgroundImage} disableScroll>
        <Header title={"Nagrody"} />

        <ScrollView style={styles.list}>{this.renderList()}</ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            title="Odbieram nagrodę"
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
    paddingTop: 15
  },

  buttonContainer: {
    paddingTop: 32,
    paddingBottom: 60,
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
