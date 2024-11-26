import { Text, View, Image, StyleSheet, Alert, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { GestureHandlerRootView, Pressable, TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type SelectImageProps = {
    handleUpload: (image: string) => void,
    iconName: string
}

const SelectImage = (props: SelectImageProps) => {

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            props.handleUpload(result.assets[0].uri);
        } else {
            Alert.alert("Permission required", "You need to allow camera permissions to take a photo");
        }
    }

    const iconName = props.iconName === "image-plus" ? "image-plus" : "image-edit"

    return (
        <View>
            <Pressable onPress={pickImage} >
                <MaterialCommunityIcons name={iconName} color="blue" style={styles.icon} ></MaterialCommunityIcons>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 40
    }
})

export default SelectImage