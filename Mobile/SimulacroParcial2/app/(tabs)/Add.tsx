import { Button, Pressable, Text, View } from "react-native";
import { TextInput } from "react-native"
import { StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ElementDTO } from "./index";
import { GlobalRoute } from "@/components/globalRoute";
import { ChangeContext } from "@/components/ChangeProvider";
import { router } from "expo-router";
import { ListContext } from "@/components/ListProvider";
import { useMemo } from "react";

import DropdownComponent from "@/components/DropDownComponent";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { globalColor } from "@/components/globalColor";

export default function Index() {

    const emptyElement: ElementDTO = { id: "", name: "", description: "", favourite: false, difficulty: "" }

    const [elementToPost, setElementToPost] = useState<ElementDTO>(emptyElement)

    const [storedChanges, setStoredChanges] = useContext(ChangeContext)
    const [elementArray, setElementArray] = useContext(ListContext)

    const nextElementId = useMemo(() => {

        return (elementArray.length > 0 ? parseInt(elementArray[elementArray.length - 1].id) + 1 : 0).toString()
    }, [elementArray])

    const [difficultyValue, setDifficultyValue] = useState<string>(storedChanges.difficultyValue || "")

    const handlePress = () => {
        console.log(elementToPost);
        fetch(GlobalRoute, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    id: nextElementId,
                    name: elementToPost.name,
                    description: elementToPost.description,
                    favourite: elementToPost.favourite,
                    difficulty: elementToPost.difficulty,
                }
            )
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data received =====", data);
                setStoredChanges({ ...storedChanges, changes: !storedChanges.changes, difficultyValue: "" });
                router.back();
            })
    }

    const handleFavourite = () => {
        setElementToPost({ ...elementToPost, favourite: !elementToPost.favourite })
    }

    const handleDifficultyChange = (value: string) => {
        setDifficultyValue(value);
        setElementToPost({ ...elementToPost, difficulty: value });
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={styles.addModal}>
                <Text>Add a new element</Text>
                <TextInput onChangeText={(text) => setElementToPost({ ...elementToPost, name: text })} style={styles.TextInput} placeholder="Name" />
                <TextInput onChangeText={(text) => setElementToPost({ ...elementToPost, description: text })} style={styles.TextInput} placeholder="Description" />
                <DropdownComponent handleChange={handleDifficultyChange} value={elementToPost.difficulty} ></DropdownComponent>
                <Pressable onPress={handleFavourite}>
                    <AntDesign name={elementToPost.favourite ? "star" : "staro"} size={45} color={elementToPost.favourite ? globalColor : "black"} />
                </Pressable>
                <View style={styles.modalFooter} >
                    <Button onPress={handlePress} title="Submit" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    addModal: {
        padding: 25,
        flex: 1,
        margin: 25,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: "white",
        alignItems: "center",
        maxHeight: 400,
        maxWidth: 400,
        gap: 13,
        borderColor: "black",
        borderWidth: 1,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    modalFooter: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    TextInput: {
        backgroundColor: "whitesmoke",
        borderRadius: 10,
        padding: 10,
        minWidth: 300,
        borderColor: "black",
        borderWidth: 1,

    },
    pictureButtons: {
        marginTop: 14,
        flexDirection: "row",
        gap: 15,
    }
});


