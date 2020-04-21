import React from "react";
import * as Styled from "./index.styled";

export const DashboardButton = ({ children, icon, badge, ...props }) => {
  const [focus, setFocus] = React.useState(false);

  return (
    <Styled.DashboardButton
      focus={focus}
      onPressIn={() => setFocus(true)}
      onPressOut={() => setFocus(false)}
      {...props}
    >
      {badge !== undefined && (
        <Styled.BadgeContainer>
          <Styled.BadgeText>{badge}</Styled.BadgeText>
        </Styled.BadgeContainer>
      )}

      <Styled.DashboardButtonIcon source={icon} />
      <Styled.DashboardButtonText>{children}</Styled.DashboardButtonText>
    </Styled.DashboardButton>
  );
};

export default DashboardButton;
