//import liraries
import React, {useState} from 'react';

import {Modal, View, StyleSheet, ActivityIndicator} from 'react-native';
import { colors } from '../config/colors';
import AppText from './AppText';
import TextButton from './TextButton';
import AnimatedLottieView from 'lottie-react-native';

// create a component
const AppDialogBox = ({
    visibility,
    title,
    description,
    cancelButtonTitle,
    submitButtonTitle,
    onCancelPress,
    onSubmitPress,
}) => {

    const [showAnimation, setShowAnimation] = useState(false);
    const [showIndicator, setShowIndicator] = useState(false);
    const [showAnimations, setShowAnimations] = useState(false);

    const doHandleSubmitPress = () => {
      setShowAnimations(true);
      setShowIndicator(true);
      setTimeout(() => {
        setShowAnimation(true);
        setShowIndicator(false);
      },1200);
    }

    return (
    <View>
      <Modal
        visible={visibility}
        animationType={'fade'}
        transparent={true}
        statusBarTranslucent>
        <View
          style={styles.backgroundContainer}>
          <View
            style={[styles.dialogBoxContainer, showAnimation && {justifyContent:"center"}]}>
            {
              showAnimations ?
                <>
                  {showIndicator && <ActivityIndicator style={{marginTop:10}} color="#7fa2ea" size={65}/>}
                  {showAnimation && 
                      <AnimatedLottieView 
                        onAnimationFinish={onSubmitPress}
                        style={{width:70, height:70}} 
                        source={require("../assets/animations/done.json")} 
                        autoPlay loop={false}/>
                  }
                </>
                
              :
                <>
                  <AppText style={{fontSize:20, fontFamily:"Poppins-SemiBold", color:colors.textColor}} title={title}/>
                  <AppText style={{textAlign:"center", color:colors.iconColor, marginBottom:40}} title={description}/>
                  <View style={[styles.buttonsContainer, !cancelButtonTitle && {justifyContent:"center"}]}>
                      {cancelButtonTitle
                          &&
                          <TextButton 
                          textStyle={{color: colors.purple, fontSize:16}}
                          title={cancelButtonTitle}
                          onPress={onCancelPress}/>
                      }

                      <TextButton 
                          containerStyles={{backgroundColor: colors.purple}} 
                          softEdges={true} 
                          textStyle={{color:colors.purple, fontSize:16}}
                          title={submitButtonTitle ? submitButtonTitle : "OK"}
                          onPress={doHandleSubmitPress}/>

                  </View>
                </>  

            }
          </View>
        </View>
      </Modal>
    </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: 'rgba(36, 37, 41, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    dialogBoxContainer:{
        alignItems: 'center',
        backgroundColor: colors.appToolbar,
        width: '90%',
        borderWidth: 0.5,
        borderColor:colors.borderColor,
        borderRadius: 20,
        elevation:1,
        padding:20,
        paddingTop:20,
        paddingBottom:20,
        justifyContent:"space-between",
        minHeight:140
    },

    buttonsContainer:{
        width:"80%",
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"space-between"
    }

});

//make this component available to the app
export default AppDialogBox;
