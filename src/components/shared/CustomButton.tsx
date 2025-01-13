import React, { FC } from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    loading: boolean;
    disabled: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({ title, onPress, loading, disabled }) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabledButton]}
            onPress={onPress}
            disabled={disabled}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default CustomButton;
