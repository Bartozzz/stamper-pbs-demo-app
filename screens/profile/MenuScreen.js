import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Hamburger from "../../components/Hamburger";

import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

class ProfileMenuScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Dashboard",
    headerTitle: "",
    headerRight: <Hamburger navigation={navigation} />,
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: colors.background
    }
    // headerTransparent: true
  });

  render() {
    const { nickname, email, photo, navigation } = this.props;

    return (
      <View style={defaultStyles.container}>
        <View style={styles.menu}>
          <Image style={styles.avatar} source={{ uri: photo }} />

          <Text style={styles.login}>{nickname}</Text>
          <Text style={styles.email}>{email}</Text>

          <View style={styles.menuSpacer} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate(Routes.PROFILE_EDIT)}
          >
            <Text style={styles.menuItemText}>Edytuj profil</Text>
          </TouchableOpacity>

          <View style={styles.menuSpacer} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate(Routes.PROFILE_PASSWORD)}
          >
            <Text style={styles.menuItemText}>Zmiana hasła</Text>
          </TouchableOpacity>

          <View style={styles.menuSpacer} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate(Routes.PROFILE_TOS)}
          >
            <Text style={styles.menuItemText}>Regulamin</Text>
          </TouchableOpacity>

          <View style={styles.menuSpacer} />

          <TouchableOpacity
            style={styles.menuItem}
            style={styles.menuItem}
            onPress={() => navigation.navigate(Routes.PROFILE_LOGOUT)}
          >
            <Text style={styles.menuItemText}>Wyloguj się</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,

    borderRadius: 40,
    borderWidth: 4,
    borderColor: colors.border
  },

  login: {
    marginVertical: 15,

    color: colors.color,
    fontSize: 18,
    fontFamily: layout.fontHead
  },

  email: {
    marginBottom: 30,

    color: colors.label
  },

  menu: {
    flex: 1,
    alignItems: "center",

    marginVertical: 45,
    marginHorizontal: 40,

    borderRadius: 10
  },
  menuSpacer: {
    width: 50,
    height: 1.5,

    backgroundColor: colors.border
  },
  menuItem: {
    marginVertical: 24
  },
  menuItemText: {
    color: colors.color,
    fontSize: 24,
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  // …
  nickname: state.profile.nickname,
  email: state.profile.email,
  photo: state.profile.photo
});

const mapDispatchToProps = {
  // …
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenuScreen);
