import { Text, View, Image, StyleSheet, Alert, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { GestureHandlerRootView, Pressable, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ImageSelectionProps = {
    handleUpload: (image: string) => void;
}

const TakePicture = (props: ImageSelectionProps) => {

    const takeImage = async () => {
        await ImagePicker.requestCameraPermissionsAsync()
        ImagePicker.getCameraPermissionsAsync().then((res) => {
            if (res.granted) {
                ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                }).then((result) => {
                    if (!result.canceled) {
                        props.handleUpload(result.assets[0].uri);
                        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", result.assets[0].uri);
                    }
                });
            } else {
                Alert.alert("Permission required", "You need to allow camera permissions to take a photo");
            }
        })
    }

    return (
        <View>
            <Pressable onPress={takeImage} >
                <MaterialCommunityIcons name="camera" color="blue" style={styles.icon} ></MaterialCommunityIcons>
            </Pressable>
        </View>
    );
}

export default TakePicture


const styles = StyleSheet.create({
    icon: {
        fontSize: 40
    }
})