import React, { FC } from "react"
import {  View, StyleSheet, TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "./CustomText";

interface PhoneInputProps {
    onChangeText: (text: string) => void;
    value: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

const PhoneInput: FC<PhoneInputProps> = ({
    onChangeText,
    value,
    onFocus,
    onBlur,
}) => {
  return (
    <View style={styles.container}>
    <CustomText fontFamily="Medium" style={styles.text}> 
        +91
    </CustomText>
    <TextInput
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={value}
        maxLength={10}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholderTextColor={'#ccc'}
        style={styles.input}
        />
    </View>
  )
};
const styles = StyleSheet.create({
    container: {

        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginVertical: 18,
        borderWidth:1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,

    },
    input:{
        fontSize:RFValue(16),
        fontFamily:'Medium',
        height: 45,
        width:"90%",
        top:2,


    },
    text:{
        fontSize:RFValue(13),
        top:-1,
        fontFamily:'Medium',

    }
});


export default PhoneInput;
