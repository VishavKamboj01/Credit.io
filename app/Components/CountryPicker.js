//import liraries
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../config/colors';

// create a component
const CountryPicker = ({items, pickerStyles, itemStyles, onValueChange}) => {
    return (
        <Picker style={[styles.picker, pickerStyles]} 
            itemStyle={[styles.pickerItem, itemStyles]}
            dropdownIconColor={colors.white}
            dropdownIconRippleColor={colors.white}
            onValueChange={onValueChange}
            
        >
            {items.map(
                item => 
                    <Picker.Item 
                        style={styles.pickerItem}
                        label={item.title} 
                        value={item.dial_code}
                        key={item.id}
                    />
                )
            }
        </Picker> 
    );
};

// define your styles
const styles = StyleSheet.create({
    picker:{
        width:"50%",
        color:colors.white,
        marginLeft:5
    },

    pickerItem:{
        backgroundColor:colors.black,
        color: "rgba(255,255,255,0.7)",
    },
});

//make this component available to the app
export default CountryPicker;
