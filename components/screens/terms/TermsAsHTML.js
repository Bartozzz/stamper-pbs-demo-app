import React from "react";
import { StyleSheet, ActivityIndicator, View, Linking } from "react-native";
import HTML from "react-native-render-html";

import Error from "../../Error";

import defaultStyles from "../../../constants/Styles";
import colors from "../../../constants/Colors";

function TermsAsHTML({ loading, content, error }) {
  function openLink(event, href) {
    return Linking.openURL(href);
  }

  if (loading) {
    return (
      <View style={[defaultStyles.container, defaultStyles.center]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <View style={styles.container}>
      <HTML html={content} tagsStyles={tagsStyles} onLinkPress={openLink} />
    </View>
  );
}

// @see https://www.npmjs.com/package/react-native-render-html#styling
const tagsStyles = {
  h2: {
    color: "white",
    fontSize: 16,

    marginTop: 20,
    marginBottom: 4
  },
  p: {
    color: "#95989A",
    fontSize: 12
  }
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20
  }
});

export default TermsAsHTML;
