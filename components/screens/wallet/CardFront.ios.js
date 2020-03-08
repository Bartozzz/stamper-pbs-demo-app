import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Bar as ProgressBar } from "react-native-progress";

import i18n from "../../../translations";
import defaultStyles from "../../../constants/Styles";
import colors from "../../../constants/Colors";
import { formatDate } from "../../../helpers/date";
import styled from "styled-components/native";

const Item = styled.TouchableOpacity`
  padding: 10px;
  margin-horizontal: 15px;
  margin-vertical: 10px;

  border-radius: 10px;

  background-color: rgba(255, 255, 255, 0.1);
`;

const ID = styled.Text`
  flex: 1;

  font-size: 14px;
  font-family: nunito-black;
  color: #95989A;
`;

const Image = styled.Image.attrs(props => ({
  resizeMode: "contain"
}))`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
`;

const Title = styled.Text`
  margin-top: 2px;
  margin-bottom: 3px;

  font-size: 14px;
  font-family: poppins-bold;
  color: ${colors.color};
`;

const Expiry = styled.Text`
  font-size: 9px;
  font-family: nunito-regular;
  color: #95989A;
`;

const Amount = styled.Text`
  flex: 1;
  margin-top: 5px;

  text-align: right;
  font-size: 12px;
  font-family: nunito-regular;
  color: #95989A;
`;

export const CardFront = ({ data, onPress }) => {
  return (
    <Item onPress={onPress}>
      <View style={[defaultStyles.row]}>
        <ID>{data.merchantName}</ID>

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
        <Image source={{ uri: data.logoUrl }}/>

        <View style={[defaultStyles.row, { flex: 1, marginLeft: 10 }]}>
          <View>
            <Title>{data.title}</Title>
            <Expiry>
              {i18n.t("prizes.validTill", {
                date: formatDate(data.validToDate)
              })}
            </Expiry>
          </View>

          <Amount>
            {data.stampsToDate} / {data.stampsTotal}
          </Amount>
        </View>
      </View>
    </Item>
  );
};

export default CardFront;
