import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function MyAccount({currentUser}) {
  return (
    <View>
      <Text>{currentUser.user_name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    
})