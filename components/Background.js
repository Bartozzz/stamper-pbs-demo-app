import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flexGrow: 1
`;

const ImageBackground = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%
`;

const ScrollView = styled.ScrollView`
  flexGrow: 1
`;

export default function Background({ children, disableScroll, ...props }) {
  const renderContainer = childs =>
    disableScroll ? (
      <Container>{childs}</Container>
    ) : (
      <ScrollView
        alwaysBounceVertical={false}
      >
        {childs}
      </ScrollView>
    );

  return renderContainer(
    <ImageBackground
      resizeMode="stretch"
      {...props}
      style={[props.style]}
    >
      {children}
    </ImageBackground>
  );
}
