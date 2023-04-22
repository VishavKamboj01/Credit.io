import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

// create a component
const AllTransactions = () => {
  return (
    <View style={styles.container}>
      <Text>All Transactions</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default AllTransactions;
