import React from "react";
import NetInfo from "@react-native-community/netinfo";
import { ActivityIndicator, StyleSheet, Text, Image, View } from "react-native";
import globalStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import * as Routes from "../../navigation";
import OfflineImage from "../../assets/offline.png";

const ConnectivityCheckScreen = ({ navigation }) => {
  const [isOffline, setIsOffline] = React.useState(false);

  React.useEffect(() => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (!isConnected) {
        setIsOffline(true);
      } else {
        navigation.navigate(Routes.AUTH_LOADING);
      }
    });
  }, []);

  if (isOffline) {
    return (
      <View style={styles.container}>
        <Image source={OfflineImage} style={styles.offlineImage} />
        <Text style={styles.offlineMessage}>Device is offline</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    ...globalStyles.center
  },

  offlineImage: {
    width: 200,
    height: 200
  },

  offlineMessage: {
    marginVertical: 25,
    color: colors.color
  }
});

export default ConnectivityCheckScreen;
