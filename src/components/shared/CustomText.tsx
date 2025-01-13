import React, {FC} from "react"
import {Text, StyleSheet} from "react-native"
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "react-native/Libraries/NewAppScreen";
const fontSizes = {
    h1:24,h2:20,h3:16,h4:14,h5:12,h6:10
};

interface CustomTextProps {
  variant?: keyof typeof fontSizes;
  style?: object;
  fontFamily?: string;
  fontSize?: number;
  numberOfLines?: number;
  children: React.ReactNode;
}

const CustomText: FC<CustomTextProps> = ({
    variant="h6",
    style,
    fontFamily="Regular",
    fontSize,
    numberOfLines,
    children,

}) => {
  return (
    
    <Text 
      style={[
        styles.text,
        {fontSize:RFValue(fontSize ?fontSize: fontSizes[variant]),fontFamily:'Notosans-${fontFamily}',...style},
      ]}
      numberOfLines={numberOfLines?numberOfLines:undefined}
      >
      {children}
    </Text>
    
  )
};
const styles = StyleSheet.create({
    text: {
        color: Colors.text,
        textAlign: 'left',
    },
});
export default CustomText;
