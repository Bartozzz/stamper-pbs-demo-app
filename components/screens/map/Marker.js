import React from "react";
import MapView from "react-native-maps";
import styled from "styled-components/native";

const Container = styled.View`
  overflow: hidden;
  background-color: white;

  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const MarkerComponent = styled.Image.attrs(props => ({
  resizeMode: "contain"
}))`
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export function Marker({ item, onPress = () => null, ...rest }) {
  return (
    <MapView.Marker onPress={onPress} {...rest}>
      <Container>
        {item.logoUrl && <MarkerComponent source={{ uri: item.logoUrl }} />}
      </Container>
    </MapView.Marker>
  );
}

export default Marker;
