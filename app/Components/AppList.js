import React, { useState } from "react";
import { FlatList, View } from "react-native";

import AppListItem from "./AppListItem";

export default function AppList({ isSwipeable, items, onListItemPressed, onDeleteIconPress, onEditIconPress }) {
  return (
    <FlatList
      inverted
      data={items}
      renderItem={({ item }) => {
        return (
          <AppListItem
            key={item.customer_id}
            name={item.full_name}
            subTitle={item.recentActivity}
            payment={item.payment}
            paymentStatus={item.paymentType}
            onItemPressed={(color) => onListItemPressed(item, color)}
            imageUri={item.image_uri}
            uniqueValue={item.customer_id}
            onDeleteIconPress={() => onDeleteIconPress(item)}
            onEditIconPress={() => onEditIconPress(item)}
            isSwipeable={isSwipeable}
          />
        );
      }}
      keyExtractor={(item, index) => String(index)}
    />
  );
}
