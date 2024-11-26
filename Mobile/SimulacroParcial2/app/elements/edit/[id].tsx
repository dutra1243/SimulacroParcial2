import { Image, StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { ElementContext } from '@/components/ElementProvider'
import { ElementDTO, elementStyles } from '../../(tabs)'
import { GlobalRoute } from '@/components/globalRoute'
import { ChangeContext } from '@/components/ChangeProvider'

import DropdownComponent from '@/components/DropDownComponent'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import { globalColor } from '@/components/globalColor'

const ElementEdit = () => {


    const [elementData, setElementData] = useContext(ElementContext)
    const [storedChanges, setStoredChanges] = useContext(ChangeContext)

    const [elementToEdit, setElementToEdit] = React.useState<ElementDTO>(elementData)

    const [difficultyValue, setDifficultyValue] = React.useState<string>(elementToEdit.difficulty)

    const handleDifficultyChange = (value: string) => {
        setDifficultyValue(value);
        setElementToEdit({ ...elementToEdit, difficulty: value });
    }

    const handlePress = () => {
        console.log(elementToEdit);
        fetch(GlobalRoute + `/${elementToEdit.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    id: elementData.id,
                    name: elementToEdit.name,
                    description: elementToEdit.description,
                    difficulty: elementToEdit.difficulty,
                    favourite: elementToEdit.favourite,

                }
            )
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data received =====", data);
                setElementData(data);
            }).then(() => {
                setStoredChanges({ ...storedChanges, changes: !storedChanges.changes })
            })
        router.back();

    }

    const handleFavourite = () => {
        setElementToEdit({ ...elementToEdit, favourite: !elementToEdit.favourite })
    }

    return (
        <View style={styles.container} >
            <View style={styles.addModal}>
                <Text style={{ fontSize: 20 }} >Edit element</Text>
                <TextInput value={elementToEdit.name} onChangeText={(text) => setElementToEdit({ ...elementToEdit, name: text })} style={styles.TextInput} placeholder="Name" />
                <TextInput multiline value={elementToEdit.description} onChangeText={(text) => setElementToEdit({ ...elementToEdit, description: text })} style={styles.TextInput} placeholder="Description" />

                <DropdownComponent handleChange={handleDifficultyChange} value={elementToEdit.difficulty} ></DropdownComponent>
                <Pressable onPress={handleFavourite}>
                    <AntDesign name={elementToEdit.favourite ? "star" : "staro"} size={45} color={elementToEdit.favourite ? globalColor : "black"} />
                </Pressable>
                <View style={styles.modalFooter} >
                    <Button onPress={handlePress} title="Submit" />
                </View>
            </View>
        </View>
    )
}

export default ElementEdit

const styles = StyleSheet.create({
    elementDetails: {
        padding: 25,
        flex: 1,
        margin: 25,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: "lightblue",
        alignItems: "center",
        maxHeight: 450,
        maxWidth: 450,
        gap: 10,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    addModal: {
        borderColor: "black",
        borderWidth: 1,
        padding: 25,
        maxHeight: 400,
        gap: 13,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        backgroundColor: "white",
        alignItems: "center",
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
        maxWidth: 300,
        borderColor: "black",
        borderWidth: 1,
    },
    pictureButtons: {
        marginTop: 14,
        flexDirection: "row",
        gap: 15,
    }
})