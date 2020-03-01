import React from "react";
import Constants from 'expo-constants';
import { version } from "../../package.json";
import styled from "styled-components/native";

const VersionComponent = styled.Text`
  color: white;
  textAlign: center;

  fontSize: 10;
  fontWeight: bold;

  marginVertical: 18
`;

export function Version({ style, ...props }) {
  return (
    <VersionComponent {...props} style={style}>
      V. {Constants.manifest.version}–{version}
    </VersionComponent>
  );
}

export default Version;
