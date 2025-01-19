import { authStyles } from "@/styles/authStyles";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View, Image, Alert, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/components/shared/CustomText";
import PhoneInput from "@/components/shared/PhoneInput";
import { commonStyles } from "@/styles/commonStyles";
import CustomButton from "@/components/shared/CustomButton";
import { router } from "expo-router";
import axios from 'axios';
import { storeWorkerData } from '../../storage'; // Import the new storage functions

const WorkerSignup = () => {
    const [workerData, setWorkerData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        address: '',
        landmark: '',
        city: ''
    });

    const handleChange = (name: string, value: string) => {
        setWorkerData({ ...workerData, [name]: value });
    };

    const handleNavigate = async () => {
        if (!workerData.mobileNumber || workerData.mobileNumber.length !== 10) {
            Alert.alert('Error', 'Please enter a valid phone number');
            return;
        }
        try {
            const response = await axios.post('http://192.168.29.223:3000/workers/register', workerData);
            console.log('Worker registered:', response.data);
            await storeWorkerData('userData', response.data); // Store worker data in AsyncStorage
            router.navigate("./Home");
        } catch (error) {
            console.error('Error registering worker:', error);
            Alert.alert('Error', 'Failed to register worker');
        }
    };

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
                <CustomText fontFamily="Medium" variant="h2">
                    Signup
                </CustomText>
                <CustomText fontFamily="Regular" variant="h3" style={authStyles.title}>
                    Enter your details to continue
                </CustomText>
                <TextInput
                    style={authStyles.input}
                    placeholder="First Name"
                    value={workerData.firstName}
                    onChangeText={(text) => handleChange('firstName', text)}
                />
                <TextInput
                    style={authStyles.input}
                    placeholder="Last Name"
                    value={workerData.lastName}
                    onChangeText={(text) => handleChange('lastName', text)}
                />
                <PhoneInput
                    onChangeText={(text) => handleChange('mobileNumber', text)}
                    value={workerData.mobileNumber}
                />
                <TextInput
                    style={authStyles.input}
                    placeholder="Address"
                    value={workerData.address}
                    onChangeText={(text) => handleChange('address', text)}
                />
                <TextInput
                    style={authStyles.input}
                    placeholder="Landmark"
                    value={workerData.landmark}
                    onChangeText={(text) => handleChange('landmark', text)}
                />
                <TextInput
                    style={authStyles.input}
                    placeholder="City"
                    value={workerData.city}
                    onChangeText={(text) => handleChange('city', text)}
                />
                <TouchableOpacity onPress={() => router.navigate("./Login")}>
                    <CustomText fontFamily="Regular" variant="h5" style={[commonStyles.lightText, { textAlign: 'center' }, { marginVertical: 20 }]}>
                        Already have an account? Login
                    </CustomText>
                </TouchableOpacity>
            </ScrollView>
            <View style={authStyles.footerContainer}>
                <CustomText fontFamily="Regular" variant="h5" style={[commonStyles.lightText, { textAlign: 'center' }, { marginHorizontal: 20 }]}>
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

export default WorkerSignup;