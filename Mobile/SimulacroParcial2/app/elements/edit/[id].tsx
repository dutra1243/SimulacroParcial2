import { Image, StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { ElementContext } from '@/components/ElementProvider'
import { ElementDTO, elementStyles } from '../../(tabs)'
import { GlobalRoute } from '@/components/globalRoute'
import { ChangeContext } from '@/components/ChangeProvider'

const ElementEdit = () => {


    const [elementData, setElementData] = useContext(ElementContext)
    const [boolean, setBoolean] = useContext(ChangeContext)

    const [elementToEdit, setElementToEdit] = React.useState<ElementDTO>(elementData)

    // const [element, setElement] = React.useState<ElementDTO>({ id: 0, name: "", description: "", moons: 0, moon_names: [""], image: "" })

    // useEffect(() => {
    //     fetch(GlobalRoute + `planets/${id}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setElement(data);
    //         })
    // }, [])

    const handlePress = () => {
        fetch(GlobalRoute + `planets/${elementData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    id: elementData.id,
                    name: elementToEdit.name,
                    description: elementToEdit.description,
                    moons: elementToEdit.moons,
                    moon_names: elementToEdit.moon_names,
                    image: elementToEdit.image,
                }
            )
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data received =====", data);
                setElementData(data);
            }).then(() => {
                setBoolean(!boolean)
            })
        router.back();

    }

    return (
        <View style={styles.container} >
            <View style={styles.addModal}>
                <Text>Edit element</Text>
                <TextInput value={elementToEdit.name} onChangeText={(text) => setElementToEdit({ ...elementToEdit, name: text })} style={styles.TextInput} placeholder="Name" />
                <TextInput multiline value={elementToEdit.description} onChangeText={(text) => setElementToEdit({ ...elementToEdit, description: text })} style={styles.TextInput} placeholder="Description" />
                <TextInput value={elementToEdit.moons.toString()} onChangeText={(text) => setElementToEdit({ ...elementToEdit, moons: parseInt(text) })} style={styles.TextInput} placeholder="Moons" keyboardType="numeric" />
                <TextInput multiline value={elementToEdit.moon_names.join(", ")} onChangeText={(text) => setElementToEdit({ ...elementToEdit, moon_names: text.split(",") })} style={styles.TextInput} placeholder="Moon names" />
                <TextInput multiline value={elementToEdit.image} onChangeText={(text) => setElementToEdit({ ...elementToEdit, image: text })} style={styles.TextInput} placeholder="Image" />
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
        padding: 25,
        flex: 1,
        margin: 25,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: "lightblue",
        alignItems: "center",
        maxHeight: 500,
        maxWidth: 400,
        gap: 20,
    },
    modalFooter: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    TextInput: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        minWidth: 300,
        maxWidth: 300,
    }
})