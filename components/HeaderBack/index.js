import React from "react";

import * as Styled from "./index.styled";
import * as Routes from "../../navigation";

export const HeaderBack = ({ onPress, navigation, ...props }) => {
  const handlePress = React.useCallback(() => {
    if (typeof onPress === "function") {
      onPress();
    } else {
      navigation.navigate(Routes.DASHBOARD);
    }
  }, [onPress, navigation]);

  return (
    <Styled.Back onPress={handlePress}>
      <Styled.BackIcon />
    </Styled.Back>
  );
};

export default HeaderBack;
