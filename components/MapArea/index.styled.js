import MapView from "react-native-maps";
import styled from "styled-components/native";

import mapStyle from "../../assets/mapStyle";
import theme from "../../constants/theme";

export const Map = styled(MapView).attrs(() => ({
  provider: MapView.PROVIDER_GOOGLE,
  maxZoomLevel: 18,
  customMapStyle: mapStyle,
}))`
  flex: 1;
  z-index: 1;

  /* Center indicator vertically: */
  justify-content: center;
  background-color: ${theme.colors.background};
`;
