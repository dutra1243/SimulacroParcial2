import { Image, StyleSheet, Text, View, Button } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { ElementContext } from '@/components/ElementProvider'
import { ElementDTO, elementStyles } from '../(tabs)'
import { GlobalRoute } from '@/components/globalRoute'
import { ChangeContext } from '@/components/ChangeProvider'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { globalColor } from '@/components/globalColor'

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
        fetch(GlobalRoute + `/${id}`, {
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



    let diffCaptilized = elementData.difficulty.charAt(0).toUpperCase() + elementData.difficulty.slice(1);

    let tagColor = "black";
    let borderColor = "black";
    switch (elementData.difficulty) {
        case "easy":
            tagColor = "green";
            borderColor = "darkgreen";
            break;
        case "medium":
            tagColor = "yellow";
            borderColor = "gold";
            break;
        case "hard":
            tagColor = "purple";
            borderColor = "darkpurple";
            break;
    }

    let fontColor = "black";
    switch (elementData.difficulty) {
        case "easy":
            fontColor = "white";
            break;
        case "medium":
            fontColor = "black";
            break;
        case "hard":
            fontColor = "white";
            break;
    }

    return (
        <View style={styles.container} >
            <View style={styles.elementDetails} >
                <View style={{ backgroundColor: tagColor, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 60, borderColor: borderColor, borderWidth: 1 }} >
                    <Text style={{ color: fontColor }} >{elementData.difficulty}</Text>
                </View>
                <Text style={styles.text} >Name: {elementData.name}</Text>
                <Text style={styles.text}>Description: {elementData.description}</Text>
                <AntDesign name={elementData.favourite ? "star" : "staro"} color={elementData.favourite ? globalColor : "black"} size={45} ></AntDesign>
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
        // marginBottom: 5,
        borderRadius: 10,
        backgroundColor: "white",
        alignItems: "center",
        gap: 28,
        borderColor: "black",
        borderWidth: 1,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        maxHeight: 350,
    },
    text: {
        fontSize: 17,
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