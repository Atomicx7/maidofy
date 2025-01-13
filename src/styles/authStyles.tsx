import { Colors, screenWidth } from "@/utils/Constants";
import { Platform, StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
    logo: {
        width: 70,
        height: 70,
        resizeMode: 'contain'
    },
    container: {
        padding: 12,
        flex: 1,
        backgroundColor: Colors.background
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: 20,
    },
    flexRowGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    footerContainer: {
        position: 'absolute',
        bottom: Platform.OS === 'android' ? 20 : 30,
        width: screenWidth,
        padding: 10,
        justifyContent: 'center',
        alignItems: "center"
    },
    title: {
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 5,
        marginBottom: 20,
    },
    button: {
        width: '80%',
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
    },
})