import * as React from "react";
import styled from "styled-components/native";

const DeleteImage = require("../../../assets/images/delete.png");

const height = 87;

const ItemRemove = styled.TouchableOpacity`
  padding: 10px;
  margin-horizontal: 15px;
  margin-vertical: 10px;

  border-radius: 10px;

  align-self: flex-end;
  align-items: center;
  justify-content: center;

  height: ${height}px;
  width: ${height}px;

  /* background-color: #555f6f; */
  background-color: #f16c41;
  border-radius: 10px;

  /* Need to add zIndex to ensure that the TouchableOpacity will receive press */
  /* events on Android: */
  zIndex: 1;
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
      <RemoveImage/>
    </ItemRemove>
  );
};

export default CardBack;
