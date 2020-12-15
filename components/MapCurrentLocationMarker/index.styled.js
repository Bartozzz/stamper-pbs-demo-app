import styled from "styled-components/native";

import images from "../../constants/images";

export const Indicator = styled.Image.attrs(() => ({
  source: images.LocationIndicator,
}))`
  z-index: 1;
  width: 120px;
  height: 120px;
`;
