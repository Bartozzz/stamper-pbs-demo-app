import styled from "styled-components/native";

import LocationIndicator from "../../assets/images/icons/location_indicator.png";

export const Indicator = styled.Image.attrs(() => ({
  source: LocationIndicator,
}))`
  z-index: 1;
  width: 120px;
  height: 120px;
`;
