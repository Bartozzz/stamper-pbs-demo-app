import * as React from "react";
import styled from "styled-components/native";

const DeleteImage = require("../../../assets/images/delete.png");

const height = 90;

const ItemRemove = styled.TouchableOpacity`
  align.items: center;
  justify-content: center;

  position: absolute;
  top: 10px;
  right: ${-height}px;

  height: ${height}px;
  width: ${height}px;

  /* background-color: #555f6f; */
  background-color: #f16c41;
  border-radius: 10px;

  /* Need to add zIndex to ensure that the TouchableOpacity will receive press */
  /* events on Android: */
  z-index: 1;
`;

const RemoveImage = styled.Image.attrs(props => ({
  source: DeleteImage
}))`
  width: 40px;
  height: 40px;
`;

export const CardBack = ({ data, onPress }) => {
  return (
    <ItemRemove onPress={onPress}>
      <RemoveImage />
    </ItemRemove>
  );
};

export default CardBack;
