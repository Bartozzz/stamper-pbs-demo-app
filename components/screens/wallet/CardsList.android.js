import * as React from "react";
import { SwipeListView } from "react-native-swipe-list-view";

import CardFront from "./CardFront";
import CardBack from "./CardBack";

const height = 90;
const margin = 15;

export const CardsList = ({ data, onCheck, onDelete }) => {
  return (
    <SwipeListView
      useFlatList
      data={data}
      keyExtractor={item => {
        return item.id;
      }}
      renderItem={(data, rowMap) => (
        <CardFront
          data={data.item}
          onPress={() => onCheck(data.item, rowMap)}
        />
      )}
      renderHiddenItem={(data, rowMap) => (
        <CardBack
          data={data.item}
          onPress={() => onDelete(data.item, rowMap)}
        />
      )}
      disableRightSwipe={true}
      rightOpenValue={-(height + margin)}
    />
  );
};

export default CardsList;
