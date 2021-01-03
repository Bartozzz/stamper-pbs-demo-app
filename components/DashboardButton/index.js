import React from "react";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

export const DashboardButton = ({ children, icon, badge, ...props }) => {
  const [focus, setFocus] = React.useState(false);

  return (
    <Theme>
      <Styled.DashboardButton
        focus={focus}
        onPressIn={() => setFocus(true)}
        onPressOut={() => setFocus(false)}
        {...props}
        testID="button"
      >
        {badge !== undefined && badge > 0 && (
          <Styled.BadgeContainer>
            <Styled.BadgeText testID="badge">{badge}</Styled.BadgeText>
          </Styled.BadgeContainer>
        )}

        <Styled.DashboardButtonIcon testID="icon" source={icon} />
        <Styled.DashboardButtonText testID="text">
          {children}
        </Styled.DashboardButtonText>
      </Styled.DashboardButton>
    </Theme>
  );
};

export default DashboardButton;
