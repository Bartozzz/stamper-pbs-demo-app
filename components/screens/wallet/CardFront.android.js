import * as React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableWithoutFeedback
} from "react-native";
import { Bar as ProgressBar } from "react-native-progress";

import i18n from "../../../translations";
import defaultStyles from "../../../constants/Styles";
import colors from "../../../constants/Colors";
import { formatDate } from "../../../helpers/date";

export const CardFront = ({ data, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.item, styles.itemFront]}>
        <View style={[defaultStyles.row]}>
          <Text style={styles.textId}>{data.merchantName}</Text>

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
          <Image
            resizeMode="contain"
            source={{ uri: data.logoUrl }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "white"
            }}
          />

          <View style={[defaultStyles.row, { flex: 1, marginLeft: 10 }]}>
            <View>
              <Text style={styles.textTitle}>{data.title}</Text>
              <Text style={styles.textExpiry}>
                {i18n.t("prizes.validTill", {
                  date: formatDate(data.validToDate)
                })}
              </Text>
            </View>

            <Text style={styles.textAmount}>
              {data.stampsToDate} / {data.stampsTotal}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 10,

    borderRadius: 10
  },
  itemFront: {
    backgroundColor: "#1a2c47"
  },

  textId: {
    flex: 1,

    fontSize: 14,
    fontFamily: "nunito-black",
    color: "#95989A"
  },
  textTitle: {
    marginTop: 2,
    marginBottom: 3,

    fontSize: 14,
    fontFamily: "poppins-bold",
    color: colors.color
  },
  textExpiry: {
    fontSize: 9,
    fontFamily: "nunito-regular",
    color: "#95989A"
  },
  textAmount: {
    flex: 1,
    marginTop: 5,

    textAlign: "right",
    fontSize: 12,
    fontFamily: "nunito-regular",
    color: "#95989A"
  }
});

export default CardFront;
