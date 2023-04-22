//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

// create a component
const SwipeablePaymentListItem = ({children, type, leftActions, rightActions}) => {
    return (
        type === "Accepted" ? 
        <Swipeable renderLeftActions={leftActions}>
            {children}
        </Swipeable>
        :
        <Swipeable renderRightActions={rightActions}>
            {children}
        </Swipeable>
    );
};

//make this component available to the app
export default SwipeablePaymentListItem;
