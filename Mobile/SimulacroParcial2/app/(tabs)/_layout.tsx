import { Stack, Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Home", headerTitleAlign: "center", tabBarIcon: ({ focused }) => (<MaterialCommunityIcons name={focused ? "home" : "home-outline"} color={focused ? "blue" : "grey"} size={25} ></MaterialCommunityIcons>) }} />
            <Tabs.Screen name="Add" options={{ title: "Add", headerTitleAlign: "center", tabBarIcon: ({ focused }) => (<MaterialCommunityIcons name={focused ? "plus" : "plus"} color={focused ? "blue" : "grey"} size={25}></MaterialCommunityIcons>) }} />
        </Tabs>
    )
}
