import React from "react";
import styled from "styled-components/native";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

export const StyledDashboardButton = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  flex: 1;
  margin: 10px;

  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ focus }) => (focus ? colors.primary : colors.border)};
  background-color: ${({ focus }) =>
    focus ? colors.highlight : "transparent"};
`;

export const StyledDashboardButtonText = styled.Text`
  margin-bottom: 20px;

  color: ${colors.color};
  font-size: 14px;
  font-family: poppins-regular;
  text-align: center;
`;

export const StyledDashboardButtonIcon = styled.Image`
  align-self: center;

  width: 60px;
  height: 60px;

  margin-top: 20px;
  margin-bottom: 16px;
`;

export const StyledBadgeContainer = styled.View`
  position: absolute;
  right: 10px;
  top: 10px;

  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;

  border-radius: 22px;
  background-color: #00d1ff;
`;

export const StyledBadgeText = styled.Text`
  color: ${colors.color};
  font-family: ${layout.fontHead};
  text-align: center;
`;

export const DashboardButton = ({ children, icon, badge, ...props }) => {
  const [focus, setFocus] = React.useState(false);

  return (
    <StyledDashboardButton
      focus={focus}
      onPressIn={() => setFocus(true)}
      onPressOut={() => setFocus(false)}
      {...props}
    >
      {badge && (
        <StyledBadgeContainer>
          <StyledBadgeText>{badge}</StyledBadgeText>
        </StyledBadgeContainer>
      )}

      <StyledDashboardButtonIcon source={icon} />
      <StyledDashboardButtonText>{children}</StyledDashboardButtonText>
    </StyledDashboardButton>
  );
};

export default DashboardButton;
