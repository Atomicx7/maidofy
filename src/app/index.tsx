import * as Font from 'expo-font';
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { splashStyles } from "@/styles/splashStyles";
import { commonStyles } from "@/styles/commonStyles";
import { resetAndNavigate } from "@/utils/Helpers";
import CustomText from "@/components/shared/CustomText";
import { createStackNavigator } from '@react-navigation/stack';
import Role from './role';
import Home from './customer/Home'; // Corrected import path

const Stack = createStackNavigator();

const Main = () => {
    const [loaded] = useFonts({
        "Regular": require("../assets/fonts/NotoSans-Regular.ttf"),
        "Medium": require("../assets/fonts/NotoSans-Medium.ttf"),
        "Bold": require("../assets/fonts/NotoSans-Bold.ttf"),
        "Light": require("../assets/fonts/NotoSans-Light.ttf"),
        "SemiBold": require("../assets/fonts/NotoSans-SemiBold.ttf"),
    });

    const [hasNavigated, setHasNavigated] = React.useState(false);
    const tokenCheck = async () => {
        resetAndNavigate('/role');
    };

    useEffect(() => {
        if (loaded && !hasNavigated) {
            const timeoutId = setTimeout(() => {
                tokenCheck();
                setHasNavigated(true);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [loaded, hasNavigated]);

    if (!loaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
   
            <View style={{ flex: 1 }}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Splash" component={SplashScreen} />
                    <Stack.Screen name="Role" component={Role} />
                    <Stack.Screen name="Home" component={Home} />

                </Stack.Navigator>
            </View>

    );
};

const SplashScreen = () => (
    <View style={styles.container}>
        <Image
            source={require('../assets/LOGOS/logo5.png')}
            style={splashStyles.img}
        />
        <CustomText variant="h3" fontFamily="Medium" style={splashStyles.text}>
            Ghar Ka SuperDrive🧹
        </CustomText>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 10000,
        height: 10000,
        resizeMode: 'contain',
    },
});

function useFonts(fontMap: { [key: string]: any }): [boolean] {
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync(fontMap);
            setLoaded(true);
        }
        loadFonts();
    }, []);
    
    return [loaded];
}

export default Main;