import CustomText from "@/components/shared/CustomText";
import { roleStyles } from "@/styles/roleStyles";
import { router } from "expo-router";
import React from "react"
import { View, Image, TouchableOpacity } from "react-native"
const Role = () => {
    const handleCustomerPress = () => {
        router.navigate('/customer/auth');
    }
    const handleCaptainPress = () => {
        router.navigate('/captain/auth');
    }
  return (
    <View style={roleStyles.container}>
        <Image
            source={require('../assets/LOGOS/logo2.png')} // Ensure this path is correct
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
            <CustomText style={roleStyles.title} >Captain</CustomText>
                <CustomText style={roleStyles.description} >
                    Are you a Captain?
                </CustomText>
            </View>
        </TouchableOpacity> 
    </View>
  )
};

export default Role;
