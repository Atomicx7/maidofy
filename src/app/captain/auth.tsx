import { authStyles } from "@/styles/authStyles";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/components/shared/CustomText";
import PhoneInput from "@/components/shared/PhoneInput";
import { commonStyles } from "@/styles/commonStyles";
import CustomButton from "@/components/shared/CustomButton";
// import { signin } from "@/service/authService";

const Auth = () => {
    const [phone, setPhone] = useState('');
    const handleNavigate = async () => {
        if(!phone || phone.length !== 10){
            Alert.alert('Error','Please enter a valid phone number'); 
            return;
        }
        // signin({role:'captain',phone})
    }
    return (
        <SafeAreaView style={authStyles.container}>
            <ScrollView contentContainerStyle={authStyles.container}>
                <View style={commonStyles.flexRowBetween}>
                    <Image source={require('../../assets/images/logo_t.png')} style={authStyles.logo} />
                <TouchableOpacity style={authStyles.flexRowGap}>
                    <MaterialIcons name="help" size={18} color="black" />
                <CustomText fontFamily="Medium" variant="h6" style={authStyles.title}>
                    Help
                </CustomText>
                </TouchableOpacity>
                </View>
                <CustomText fontFamily="Medium" variant="h2" >
                    What's Your Phone Number?
                </CustomText>
                <CustomText fontFamily="Regular" variant="h3" style={authStyles.title}>
                    Enter your phone number to continue
                </CustomText>
                <PhoneInput 
                    onChangeText={setPhone} 
                    value={phone} />
                
                </ScrollView> 


                <View style={authStyles. footerContainer}> 
                        <CustomText fontFamily="Regular" variant="h5" style={[commonStyles.lightText,{textAlign:'center'},{marginHorizontal:20}]}>  
                            By continuing, you agree to conditions to the Cleannest 
                        </CustomText> 
                        <CustomButton
                          title="Next"
                          onPress={handleNavigate}
                          loading={false}
                          disabled={false}
                        />
                </View>
                    
                  
        </SafeAreaView>
    );
};

export default Auth;
