import * as React from "react";
import { View, Platform } from "react-native";
import { Bar as ProgressBar } from "react-native-progress";

import Theme from "./index.theme";
import * as Styled from "./index.styled";
import i18n from "../../../../translations";
import defaultStyles from "../../../../constants/Styles";
import { formatDate } from "../../../../helpers/date";

export const CardFront = ({ data, onPress }) => {
  return (
    <Theme>
      <Styled.Item
        onPress={onPress}
        activeOpacity={Platform.OS === "android" ? 1 : 0.2}
      >
        <View style={[defaultStyles.row]}>
          <Styled.ID>{data.merchantName}</Styled.ID>

          <View style={{ marginTop: 6 }}>
            <ProgressBar
              progress={data.stampsToDate / data.stampsTotal}
              borderRadius={0}
              height={6}
              width={140}
              color="#0046F5"
              unfilledColor="#001432"
              borderWidth={0}
            />
          </View>
        </View>

        <View style={[defaultStyles.row, { paddingTop: 10 }]}>
          {Platform.select({
            ios: <Styled.Image source={{ uri: data.logoUrl }} />,
            android: (
              <Styled.ImageContainer>
                <Styled.Image source={{ uri: data.logoUrl }} />
              </Styled.ImageContainer>
            ),
          })}
          <View style={[defaultStyles.row, { flex: 1, marginLeft: 10 }]}>
            <View>
              <Styled.Title>{data.title}</Styled.Title>
              <Styled.Expiry>
                {i18n.t("prizes.validTill", {
                  date: formatDate(data.validToDate),
                })}
              </Styled.Expiry>
            </View>

            <Styled.Amount>
              {data.stampsToDate} / {data.stampsTotal}
            </Styled.Amount>
          </View>
        </View>
      </Styled.Item>
    </Theme>
  );
};

export default CardFront;
