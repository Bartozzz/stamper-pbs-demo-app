import React from "react";

import * as Styled from "./index.styled";
import * as Routes from "../../navigation";

export const HeaderHamburger = ({ onPress, navigation, props }) => {
  const handlePress = React.useCallback(() => {
    if (typeof onPress === "function") {
      onPress();
    } else {
      navigation.navigate(Routes.DASHBOARD);
    }
  }, [onPress, navigation]);

  return (
    <Styled.Hamburger onPress={handlePress}>
      <Styled.HamburgerIcon />
    </Styled.Hamburger>
  );
};

export default HeaderHamburger;
