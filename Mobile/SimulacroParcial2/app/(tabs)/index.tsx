import { GlobalRoute } from "@/components/globalRoute";
import { useContext, useEffect, useState } from "react";
import { Button, FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { ElementContext } from "@/components/ElementProvider";
import { ListContext } from "@/components/ListProvider";
import { ChangeContext } from "@/components/ChangeProvider";

import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { globalColor } from "@/components/globalColor";


export function ElementItem(props: ElementDTO) {

    const [elementData, setElementData] = useContext(ElementContext)
    const [storedChanges, setStoredChanges] = useContext(ChangeContext)


    const handlePress = () => {
        setElementData(props);
        router.push({ pathname: "./elements/[id]", params: { id: props.id } });
    }

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", props);

    const handleDelete = () => {
        fetch(GlobalRoute + `/${props.id}`, {
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
    }

    const rightActions = () => {
        return (
            <View style={{
                justifyContent: 'center', backgroundColor: 'lightblue',
                padding: 10, borderRadius: 10, marginVertical: 25,
                marginHorizontal: 0
            }}>
                <Button onPress={handleDelete} color="red" title="Delete"></Button>
            </View>
        )
    }

    const handleEdit = () => {
        setElementData(props);
        router.push({ pathname: "./elements/edit/[id]", params: { id: props.id } });
    }

    const leftActions = () => {
        return (
            <View style={{
                justifyContent: 'center', backgroundColor: 'lightblue',
                padding: 10, borderRadius: 10, marginVertical: 25,
                marginHorizontal: 0
            }}>
                <Button onPress={handleEdit} title="Edit"></Button>
            </View>
        )
    }

    let tagColor = "black";
    let borderColor = "black";
    switch (props.difficulty) {
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
    switch (props.difficulty) {
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

        // <Swipeable renderRightActions={rightActions} renderLeftActions={leftActions}>
        <TouchableOpacity onPress={handlePress}>
            <View style={elementStyles.element} >
                <Text style={elementStyles.elementTitle} >{props.name}</Text>
                <View style={{ backgroundColor: tagColor, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 60, borderColor: borderColor, borderWidth: 1 }} >
                    <Text style={{ color: fontColor }} >{props.difficulty}</Text>
                </View>
                <Text style={{ color: "grey", fontWeight: "bold" }} >{props.description}</Text>
                <AntDesign name={props.favourite ? "star" : "staro"} size={45} color={props.favourite ? globalColor : "black"} />
            </View>
        </TouchableOpacity>
        // </Swipeable>

    );
}

export interface ElementDTO {
    id: string;
    name: string;
    description: string;
    difficulty: string,
    favourite: boolean
}

export default function Index() {


    const [elementArray, setElementArray] = useContext(ListContext)
    const [storedChanges, setStoredChanges] = useContext(ChangeContext)


    useEffect(() => {
        fetch(GlobalRoute, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setElementArray(data);
            })
    }, [storedChanges]);

    const sortedArrayAlphabetically = elementArray.sort((a: ElementDTO, b: ElementDTO) => a.name.localeCompare(b.name));

    const sortedArrayByFavourite = sortedArrayAlphabetically.sort((a: ElementDTO, b: ElementDTO) => a.favourite === b.favourite ? 0 : a.favourite ? -1 : 1);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <FlatList data={elementArray} renderItem={({ item }) => item.id !== "" ? <ElementItem {...item} /> : <Text>Object Empty</Text>}>

            </FlatList>
        </View>
    );
}


export const elementStyles = StyleSheet.create({
    element: {
        padding: 25,
        flex: 1,
        margin: 25,
        // marginBottom: 5,
        borderRadius: 10,
        backgroundColor: "white",
        alignItems: "center",
        gap: 10,
        borderColor: "black",
        borderWidth: 1,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    elementTitle: {
        fontSize: 20,
    },
    DropDown: {
        minWidth: 300,
        marginTop: 25,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
    }
})