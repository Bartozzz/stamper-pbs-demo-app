import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import images from "../../constants/images";

import * as Styled from "./index.styled";
import * as Box from "../layout/Box";
import Button from "../Button";

export const PopUp = ({ active, title, content, onClose, button, onPress }) => {
  return (
    <Styled.Container active={active} testID="pop-up">
      <Box.Container>
        <Styled.Close onPress={onClose} testID="pop-up-close">
          <Ionicons name="md-close" size={32} color="white" />
        </Styled.Close>

        <Box.Icon width={100} height={80} source={images.Newsletter} />
        <Box.Heading>{title}</Box.Heading>
        <Styled.Subheading>{content}</Styled.Subheading>
        <Styled.ButtonContainer>
          <Button onPress={onPress} title={button} testID="pop-up-button" />
        </Styled.ButtonContainer>
      </Box.Container>
    </Styled.Container>
  );
};

export default PopUp;
