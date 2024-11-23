import { Image, StyleSheet, Text, View, Button } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { ElementContext } from '@/components/ElementProvider'
import { ElementDTO, elementStyles } from '../(tabs)'
import { GlobalRoute } from '@/components/globalRoute'
import { ChangeContext } from '@/components/ChangeProvider'

const Element = () => {

    const { id } = useLocalSearchParams() as { id: string };


    const [elementData, setElementData] = useContext(ElementContext)
    const [storedChanges, setStoredChanges] = useContext(ChangeContext)

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

    const handleEdit = () => {
        router.push({ pathname: "./edit/[id]", params: { id: id } });
    }

    const handleDelete = () => {
        fetch(GlobalRoute + `planets/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data received =====", data);
                setElementData(data);
            }).then(() => {
                setStoredChanges({ ...storedChanges, changes: !storedChanges.changes })
            })
        setStoredChanges({ ...storedChanges, changes: !storedChanges.changes })
        router.back();
    }

    return (
        <View style={styles.container} >
            <View style={styles.elementDetails} >
                <Image style={elementStyles.image} source={{ uri: elementData.image }}></Image>
                <Text>Name: {elementData.name}</Text>
                <Text>Description: {elementData.description}</Text>
                <Text>Number: {elementData.moons}</Text>
                <Text>Names: {elementData.moon_names.join(", ")}</Text>
                <View style={styles.buttonContainer} >
                    <Button onPress={handleEdit} title="Edit" />
                    <Button color={"red"} onPress={handleDelete} title="Delete" />
                </View>
            </View>
        </View>
    )
}

export default Element

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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: 200,
    }
})