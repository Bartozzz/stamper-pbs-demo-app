import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { Text } from "./index.styled";
import Theme from "./index.theme";

import defaultStyles from "../../constants/Styles";
import useTimeout from "../../helpers/hooks/useTimeout";

export function AlertModal({
  style,
  width,
  height,
  image,
  message,
  redirect,
  timeout,
}) {
  useTimeout(redirect, timeout);

  return (
    <Theme>
      <TouchableOpacity
        onPress={redirect}
        activeOpacity={1}
        style={[defaultStyles.container, defaultStyles.center, style]}
      >
        <Image
          style={[{ width, height }]}
          resizeMode="contain"
          source={image}
        />
        <Text>{message}</Text>
      </TouchableOpacity>
    </Theme>
  );
}

export default AlertModal;
