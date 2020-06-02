import React from "react";

import * as Styled from "./index.styled";
import MapCurrentLocationMarker from "../MapCurrentLocationMarker";

export const MapArea = ({ children, userPosition, ...rest }) => {
  return (
    <Styled.Map initialRegion={userPosition} {...rest}>
      <MapCurrentLocationMarker coordinate={userPosition} />

      {children}
    </Styled.Map>
  );
};

export default MapArea;
