import CustomText from "@/components/shared/CustomText";
import { roleStyles } from "@/styles/roleStyles";
import { router } from "expo-router";
import React from "react"
import { View, Image, TouchableOpacity, useColorScheme } from "react-native"
import { useTheme } from '../utils/theme';
import { StatusBar } from "react-native";


const Role = () => {
    const { colors } = useTheme();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const handleCustomerPress = () => {
        router.navigate('/customer/auth');
    }
    const handleCaptainPress = () => {
        router.navigate('/worker/auth');
    }
  return (
    <View style={[roleStyles.container, { backgroundColor: colors.background }]}>
        <Image
            source={require('../assets/LOGOS/logo5.png')} // Ensure this path is correct
            style={roleStyles.logo}
        />
        <CustomText fontFamily="Medium" variant="h2" style={roleStyles.title}>
    Choose Your User Type
        </CustomText>
        <TouchableOpacity style={roleStyles.card} onPress={handleCustomerPress}>
            <Image
                source={require('../assets/images/customer1.webp')} // Ensure this path is correct
                style={roleStyles.image}
            />
            <View style={roleStyles.cardContent}>
                <CustomText style={roleStyles.title} >Customer</CustomText>
                <CustomText style={roleStyles.description} >
                    Are you a Customer?
                </CustomText>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={roleStyles.card} onPress={handleCaptainPress}>
            <Image
                source={require('../assets/images/maid.jpg')} // Ensure this path is correct
                style={roleStyles.image}
            />
            <View style={roleStyles.cardContent}>
            <CustomText style={roleStyles.title} >Worker</CustomText>
                <CustomText style={roleStyles.description} >
                    Are you a Worker?
                </CustomText>
            </View>
        </TouchableOpacity> 
    </View>
  )
};

export default Role;
