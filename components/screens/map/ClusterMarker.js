import React from "react";
import MapView from "react-native-maps";
import colors from "../../../constants/Colors";
import styled from "styled-components/native";

const Container = styled.View`
  flex-direction: column;
  align-self: flex-start;
`;

const Bubble = styled.View`
  flex: 0;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  justify-content: center;

  min-width: 40px;
  min-height: 40px;

  border-radius: 20px;
  border-width: 1px;
  border-color: ${colors.primary};

  background-color: ${colors.primary};

  zIndex: 2;
`;

const Count = styled.Text`
  color: #fff;
  font-size: 13px;
  font-weight: bold;
`;

const ClusterMarker = ({ count, onPress = () => null, ...rest }) => (
  <MapView.Marker onPress={onPress} {...rest}>
    <Container>
      <Bubble>
        <Count>{count}</Count>
      </Bubble>
    </Container>
  </MapView.Marker>
);

export default ClusterMarker;
