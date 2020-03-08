import React from "react";
import Constants from 'expo-constants';
import { version } from "../../package.json";
import styled from "styled-components/native";

const VersionComponent = styled.Text`
  color: white;
  text-align: center;

  font-size: 10px;
  font-weight: bold;

  margin-vertical: 18px;
`;

export function Version({ style, ...props }) {
  return (
    <VersionComponent {...props} style={style}>
      V. {Constants.manifest.version}–{version}
    </VersionComponent>
  );
}

export default Version;
