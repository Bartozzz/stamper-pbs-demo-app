import React from "react";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

export const SelectableCard = ({
  onPress,
  renderFront,
  renderBack,
  selectable = true,
  ...props
}) => {
  const [selected, setSelected] = React.useState(false);

  const handlePress = React.useCallback(() => {
    if (selectable) {
      setSelected((selected) => !selected);
    }

    if (onPress) {
      onPress();
    }
  });

  return (
    <Theme>
      <Styled.CardContainer
        {...props}
        selected={selected}
        onPress={handlePress}
      >
        {selected ? renderBack() : renderFront()}
      </Styled.CardContainer>
    </Theme>
  );
};

export default SelectableCard;
