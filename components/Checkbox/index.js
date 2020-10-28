import React from "react";
import { Ionicons } from "@expo/vector-icons";

import * as Styled from "./index.styled";

export const CheckBoxLabel = Styled.CheckBoxLabel;

export const Checkbox = ({ label, checked, onChange }) => {
  const [check, setCheck] = React.useState(checked);

  const handlePress = React.useCallback(() => {
    const isChecked = !check;

    onChange(isChecked);
    setCheck(isChecked);
  }, [onChange, check]);

  return (
    <Styled.Container>
      <Styled.CheckboxComponent
        checked={check}
        onPress={handlePress}
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
