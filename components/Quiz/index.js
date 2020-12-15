import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import images from "../../constants/images";
import i18n from "../../translations";

import * as Styled from "./index.styled";
import * as Box from "../layout/Box";

export const Quiz = ({ active, title, content, onClose, onYes, onNo }) => {
  return (
    <Styled.Container active={active} testID="pop-up">
      <Box.Container>
        <Styled.Close onPress={onClose} testID="pop-up-close">
          <Ionicons name="md-close" size={32} color="white" />
        </Styled.Close>

        <Box.Icon width={100} height={80} source={images.Newsletter} />
        <Box.Heading style={{ fontSize: 21 }}>{title}</Box.Heading>
        <Styled.Subheading>{content}</Styled.Subheading>
        <Styled.ButtonContainer>
          <Styled.AnswerButton
            onPress={onYes}
            title={i18n.t("yes")}
            testID="pop-up-button"
          />
          <Styled.AnswerButton
            onPress={onNo}
            title={i18n.t("no")}
            testID="pop-up-button"
          />
        </Styled.ButtonContainer>
      </Box.Container>
    </Styled.Container>
  );
};

export default Quiz;
