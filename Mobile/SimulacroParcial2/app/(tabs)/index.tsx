import { GlobalRoute } from "@/components/globalRoute";
import { useContext, useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { ElementContext } from "@/components/ElementProvider";
import { ListContext } from "@/components/ListProvider";
import { ChangeContext } from "@/components/ChangeProvider";

export function ElementItem(props: ElementDTO) {

    const [elementData, setElementData] = useContext(ElementContext)


    const handlePress = () => {
        setElementData(props);
        router.push({ pathname: "./elements/[id]", params: { id: props.id } });
    }

    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", props);

    return (
        <Pressable onPress={handlePress}>

            <View style={elementStyles.element} >
                <Image alt="No picture found." source={{ uri: props.image }} style={elementStyles.image} ></Image>
                <Text style={elementStyles.elementTitle} >{props.name}</Text>
            </View>
        </Pressable>
    );
}

export interface ElementDTO {
    id: string;
    name: string;
    description: string;
    moons: number;
    moon_names: string[];
    image: string;
}

export default function Index() {


    const [elementArray, setElementArray] = useContext(ListContext)
    const [boolean, setBoolean] = useContext(ChangeContext)


    useEffect(() => {
        fetch(GlobalRoute + "planets", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setElementArray(data);
            })
    }, [boolean]);

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
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: "lightblue",
        alignItems: "center",
        gap: 10,

    },
    elementTitle: {
        fontSize: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
    }
})