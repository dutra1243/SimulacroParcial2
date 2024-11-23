import { Button, Text, View } from "react-native";
import { TextInput } from "react-native"
import { StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ElementDTO } from "./index";
import { GlobalRoute } from "@/components/globalRoute";
import { ChangeContext } from "@/components/ChangeProvider";
import IDProvider, { IDContext } from "@/components/IDProvider";
import { router } from "expo-router";


export default function Index() {

    const emptyElement: ElementDTO = { id: "", name: "", description: "", moons: 0, moon_names: [""], image: "" }

    const [elementToPost, setElementToPost] = useState(emptyElement)

    const [boolean, setBoolean] = useContext(ChangeContext)
    const [idToPost, setIdToPost] = useContext(IDContext)



    const handlePress = () => {
        console.log(elementToPost);
        fetch(GlobalRoute + "planets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    id: idToPost.toString(),
                    name: elementToPost.name,
                    description: elementToPost.description,
                    moons: elementToPost.moons,
                    moon_names: elementToPost.moon_names,
                    image: elementToPost.image,
                }
            )
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data received =====", data);
                setElementToPost(data);
                setIdToPost(idToPost + 1);
                setBoolean(!boolean)
                router.back();
            })
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
                <TextInput onChangeText={(text) => setElementToPost({ ...elementToPost, moons: parseInt(text) })} style={styles.TextInput} placeholder="Moons" keyboardType="numeric" />
                <TextInput onChangeText={(text) => setElementToPost({ ...elementToPost, moon_names: text.split(",") })} style={styles.TextInput} placeholder="Moon names" />
                <TextInput onChangeText={(text) => setElementToPost({ ...elementToPost, image: text })} style={styles.TextInput} placeholder="Image" />
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
        backgroundColor: "lightblue",
        alignItems: "center",
        maxHeight: 400,
        maxWidth: 400,
        gap: 10,
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
    }
});


