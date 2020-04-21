import React from "react";
import styled from "styled-components/native";

export const StyledCardContainer = styled.TouchableOpacity`
  position: relative;

  padding: 10px;
  margin-horizontal: 15px;
  margin-vertical: 10px;

  border-width: 1px;
  border-radius: 10px;
  border-style: solid;
  border-color: ${({ selected }) => (selected ? "#0046F5" : "#203451")};
  background-color: ${({ selected }) => (selected ? "#ffffff" : "#203451")};
`;

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
    <StyledCardContainer {...props} selected={selected} onPress={handlePress}>
      {selected ? renderBack() : renderFront()}
    </StyledCardContainer>
  );
};

export default SelectableCard;
