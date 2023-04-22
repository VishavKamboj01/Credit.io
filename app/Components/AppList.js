import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { colors } from "../config/colors";

import AppListItem from "./AppListItem";
import AppListItemSeperator from "./AppListItemSeperator";

export default function AppList({ items, onListItemPressed, onDeleteIconPress, onEditIconPress }) {
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
            onItemPressed={() => onListItemPressed(item)}
            imageUri={item.image_uri}
            uniqueValue={item.customer_id}
            onDeleteIconPress={() => onDeleteIconPress(item)}
            onEditIconPress={() => onEditIconPress(item)}
          />
        );
      }}
      keyExtractor={(item, index) => String(index)}
    />
  );
}
