/* eslint-disable react/display-name */
import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Linking
} from "react-native";
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
      <HTML
        html={content}
        tagsStyles={tagsStyles}
        onLinkPress={openLink}
        listsPrefixesRenderers={{
          ul: () => (
            <View
              style={{
                marginRight: 10,
                width: 12 / 2.8,
                height: 12 / 2.8,
                marginTop: 12 / 2,
                borderRadius: 12 / 2.8,
                backgroundColor: "white"
              }}
            />
          ),
          ol: (_htmlAttribs, _children, _convertedCSSStyles, passProps) => (
            <Text style={{ marginRight: 5, fontSize: 12, color: "white" }}>
              {passProps.index + 1})
            </Text>
          )
        }}
      />
    </View>
  );
}

const headingStyle = {
  color: "white"
};

const textStyle = {
  color: "#95989A",
  fontSize: 12
};

const listStyle = {
  marginTop: 5
};

// @see https://www.npmjs.com/package/react-native-render-html#styling
const tagsStyles = {
  h1: {
    ...headingStyle,
    marginBottom: 10
  },
  h2: {
    ...headingStyle,
    fontSize: 16,

    marginTop: 20,
    marginBottom: 4
  },
  ol: {
    ...listStyle
  },
  ul: {
    ...listStyle
  },
  p: {
    ...textStyle
  },
  li: {
    ...textStyle
  }
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20
  }
});

export default TermsAsHTML;
