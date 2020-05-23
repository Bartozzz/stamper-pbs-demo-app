import React from "react";
import { Ionicons } from "@expo/vector-icons";

import * as Styled from "./index.styled";

export const CheckBoxLabel = Styled.CheckBoxLabel;

export const Checkbox = ({ label, checked }) => {
  const [check, setCheck] = React.useState(checked);

  return (
    <Styled.Container>
      <Styled.CheckboxComponent
        checked={check}
        onPress={() => setCheck((check) => !check)}
        testID="checkbox"
      >
        {check && (
          <Ionicons
            testID="checked-icon"
            name="md-checkmark"
            size={14}
            color="white"
          />
        )}
      </Styled.CheckboxComponent>
      {label}
    </Styled.Container>
  );
};

export default Checkbox;
